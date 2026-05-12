import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,           // Target file size 50 KB
    maxWidthOrHeight: 800,     // Max dimension 800px
    useWebWorker: true,        // Non-blocking compression
    initialQuality: 0.7,       // 70% quality (adjustable)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Compression error:', error);
    return file; // Fallback to original file
  }
};