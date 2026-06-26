// Nikkey Box — upload direto para Firebase Storage (sem Cloudinary).
import { storage } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function uploadToFirebase(blob: Blob, folder: string): Promise<string> {
  if (!storage) throw new Error('Firebase Storage indisponível.');
  const ext = blob.type.includes('webp') ? 'webp'
    : blob.type.includes('png') ? 'png'
    : blob.type.includes('gif') ? 'gif'
    : 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, { contentType: blob.type });
  return getDownloadURL(storageRef);
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

  needsMigration: (s?: string) =>
    typeof s === 'string' && s.startsWith('data:'),

  async uploadDataUrl(dataUrl: string, folder: string): Promise<string> {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return uploadToFirebase(blob, folder);
  },
};
