import React, { useState, useRef, useEffect } from 'react';
import { Camera, XCircle, QrCode } from 'lucide-react';
import { detectQRCode } from '../utils/qrDetector';
import { useCart } from '../hooks/useCart';

export const QRScanner = ({ onScanComplete, setCurrentPage }) => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const { setCurrentTable } = useCart();

  const startQRScanner = async () => {
    setShowQRScanner(true);
    setScanMessage('');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
        scanQRCode();
      }
    } catch (err) {
      console.error('Errore accesso camera:', err);
      setScanMessage('Impossibile accedere alla fotocamera. Verifica i permessi.');
    }
  };

  const stopQRScanner = () => {
    setIsScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowQRScanner(false);
    setScanMessage('');
  };

  const scanQRCode = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = detectQRCode(imageData);
      
      if (code) {
        setScanMessage(`Tavolo ${code} rilevato!`);
        setCurrentTable(code);
        stopQRScanner();
        setTimeout(() => {
          setCurrentPage('menu');
          if (onScanComplete) onScanComplete(code);
        }, 1000);
        return;
      }
    }
    
    if (isScanning) {
      requestAnimationFrame(scanQRCode);
    }
  };

  const handleManualEntry = () => {
    const tableNumber = prompt('Inserisci il numero del tavolo:');
    if (tableNumber && tableNumber.trim()) {
      setCurrentTable(tableNumber.trim());
      setScanMessage(`Tavolo ${tableNumber.trim()} impostato!`);
      setTimeout(() => {
        setCurrentPage('menu');
        if (onScanComplete) onScanComplete(tableNumber.trim());
      }, 800);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <QrCode size={64} className="mx-auto text-pink-500 mb-4" />
      <h3 className="text-2xl font-bold mb-4">Ordina dal tuo tavolo</h3>
      <p className="text-gray-600 mb-6">
        Scansiona il QR code del tuo tavolo per accedere al menu digitale
      </p>
      
      {!showQRScanner ? (
        <div className="space-y-3">
          <button
            onClick={startQRScanner}
            className="w-full bg-pink-500 text-white py-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
          >
            <Camera size={24} />
            Scansiona QR Code
          </button>
          <button
            onClick={handleManualEntry}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Inserisci numero tavolo manualmente
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-4 border-pink-500 rounded-lg relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white"></div>
              </div>
            </div>
          </div>
          
          {scanMessage && (
            <div className="bg-green-100 text-green-800 py-2 px-4 rounded-lg">
              {scanMessage}
            </div>
          )}
          
          <p className="text-sm text-gray-600">
            Posiziona il QR code all'interno del riquadro
          </p>
          
          <button
            onClick={stopQRScanner}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <XCircle size={20} />
            Annulla Scansione
          </button>
        </div>
      )}
    </div>
  );
};