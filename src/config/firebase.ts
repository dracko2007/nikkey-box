// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Configuration — Nikkey Box (projeto separado do Japan Express)
const firebaseConfig = {
  apiKey: "AIzaSyCyji55VsRGUJbIKFmzOU0ykQ6B8L_LjKE",
  authDomain: "nikkey-box.firebaseapp.com",
  projectId: "nikkey-box",
  storageBucket: "nikkey-box.firebasestorage.app",
  messagingSenderId: "685043539963",
  appId: "1:685043539963:web:ee596d4caf27f7046db55e",
  measurementId: "G-L8JD3B7E57"
};

const firebaseConfigReady = true;
const firebaseConfigSource = 'direct-config';
const firebaseDisabled = import.meta.env.VITE_DISABLE_FIREBASE === 'true';
const allowLocalOnly = import.meta.env.VITE_ALLOW_LOCAL_ONLY === 'true';

// Initialize Firebase
let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  if (import.meta.env.DEV) console.log('✅ Firebase initialized with project:', firebaseConfig.projectId);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

export { app, auth, db, storage, firebaseConfig, firebaseConfigReady, firebaseDisabled, allowLocalOnly, firebaseConfigSource };
