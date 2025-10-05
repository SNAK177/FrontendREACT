import React, { useState, useRef, useEffect } from "react";
import { Camera, XCircle, QrCode } from "lucide-react";
import { detectQRCode } from "../utils/qrDetector";
import { useCart } from "../hooks/useCart";
import "./QRScanner.css";

export const QRScanner = ({ onScanComplete, setCurrentPage }) => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const { setTableNumber } = useCart();

  const startQRScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      setShowQRScanner(true);

      scanIntervalRef.current = setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const result = detectQRCode(videoRef.current, canvasRef.current);
          if (result) {
            handleQRCodeDetected(result);
          }
        }
      }, 500);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setScanMessage("Errore nell'accesso alla fotocamera");
    }
  };

  const stopQRScanner = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setShowQRScanner(false);
    setScanMessage("");
  };

  const handleQRCodeDetected = (tableNumber) => {
    stopQRScanner();
    setTableNumber(tableNumber);
    setScanMessage(`Tavolo ${tableNumber} rilevato!`);
    if (onScanComplete) {
      onScanComplete(tableNumber);
    }
    setTimeout(() => {
      setCurrentPage("menu");
    }, 1500);
  };

  const handleManualEntry = () => {
    const tableNumber = prompt("Inserisci il numero del tavolo:");
    if (tableNumber) {
      handleQRCodeDetected(tableNumber);
    }
  };

  useEffect(() => {
    return () => {
      stopQRScanner();
    };
  }, []);

  return (
    <div className="qr-container">
      <QrCode size={64} className="qr-icon" />
      <h3 className="qr-title">Ordina dal tuo tavolo</h3>
      <p className="qr-description">
        Scansiona il QR code del tuo tavolo per accedere al menu digitale
      </p>

      {!showQRScanner ? (
        <div className="button-container">
          <button onClick={startQRScanner} className="scan-button">
            <Camera size={24} />
            Scansiona QR Code
          </button>
          <button onClick={handleManualEntry} className="manual-button">
            Inserisci numero tavolo manualmente
          </button>
        </div>
      ) : (
        <div className="button-container">
          <div className="scanner-view">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="camera-feed"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div className="scan-overlay">
              <div className="scan-frame">
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>
              </div>
            </div>
          </div>

          {scanMessage && <div className="success-message">{scanMessage}</div>}

          <p className="scan-hint">
            Posiziona il QR code all'interno del riquadro
          </p>

          <button onClick={stopQRScanner} className="cancel-button">
            <XCircle size={20} />
            Annulla Scansione
          </button>
        </div>
      )}
    </div>
  );
};
