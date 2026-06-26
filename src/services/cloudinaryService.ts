/**
 * Nikkey Box — imagens salvas comprimidas no Firestore (sem Storage externo).
 * Comprime para JPEG ~800px, ~80% qualidade antes de salvar.
 * Evita CORS do Firebase Storage e dependência do Cloudinary.
 */

async function compressToJpeg(dataUrl: string, maxPx = 500, quality = 0.70): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl); // fallback sem compressão
    img.src = dataUrl;
  });
}

export const cloudinaryService = {
  isCloudinaryUrl: (s: string) =>
    typeof s === 'string' && s.includes('res.cloudinary.com'),

  isFirebaseUrl: (s: string) =>
    typeof s === 'string' && s.includes('firebasestorage.app'),

  isDataUrl: (s: string) =>
    typeof s === 'string' && s.startsWith('data:'),

  isExternalUrl: (s: string) =>
    typeof s === 'string' &&
    s.startsWith('http') &&
    !s.includes('res.cloudinary.com') &&
    !s.includes('firebasestorage.app'),

  needsMigration: (_s?: string) => false,

  async uploadDataUrl(dataUrl: string, _folder: string): Promise<string> {
    // URL externa (http) → retorna direto
    if (dataUrl.startsWith('http')) return dataUrl;
    // Comprime para JPEG 500px/70% (~15-25KB base64) e salva no Firestore
    return compressToJpeg(dataUrl, 500, 0.70);
  },
};
