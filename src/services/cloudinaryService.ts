/**
 * Nikkey Box — imagens salvas comprimidas no Firestore (sem Storage externo).
 * Comprime para JPEG ~800px, ~80% qualidade antes de salvar.
 * Evita CORS do Firebase Storage e dependência do Cloudinary.
 */

async function compressToJpeg(dataUrl: string, maxPx = 800, quality = 0.80): Promise<string> {
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
    // Se já é uma URL externa (http), retorna direto — não precisa fazer upload
    if (dataUrl.startsWith('http')) return dataUrl;
    // Comprime e salva como dataUrl no Firestore
    return compressToJpeg(dataUrl, 800, 0.80);
  },
};
