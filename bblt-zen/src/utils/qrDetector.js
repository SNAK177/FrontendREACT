import jsQR from 'jsqr';

export const detectQRCode = (imageData) => {
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
        return code.data;
    }
    return null;
};