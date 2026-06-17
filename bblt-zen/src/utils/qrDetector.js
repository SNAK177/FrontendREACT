import jsQR from 'jsqr';

/**
 * Cattura il frame corrente del video su un canvas nascosto,
 * estrae i pixel con getImageData e li passa a jsQR.
 * Prima non veniva fatto nessun disegno sul canvas: si passavano
 * direttamente video/canvas a jsQR, che si aspetta un ImageData.
 */
export const detectQRCode = (video, canvas) => {
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
        return null;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) {
        return null;
    }

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d', {willReadFrequently: true});
    context.drawImage(video, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    return code ? code.data : null;
};
