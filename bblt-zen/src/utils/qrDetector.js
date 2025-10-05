/*export const detectQR = (imageData) => {
    const data = imageData.data;
    // Dummy implementation: In a real scenario, you would use a library like jsQR or similar
    let brightness = 0;

    for (let i = 0; i < data.length; i += 4) {
        brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    const avgBrightness = brightness / (data.length / 4);

    //simulate detection
    if (avgBrightness > 100 && avgBrightness < 150 && Math.random() > 0.95) {
        return Math.floor(Math.random() * 20) + 1;
    }
    return null;
};*/
import jsQR from 'jsqr';

export const detectQRCode = (imageData) => {
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  if (code) {
    return code.data;
  }
  return null;
};