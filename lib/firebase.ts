import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456'
};

// Only initialize Firebase if we have valid config
let app: any = null;
let db: any = null;
let auth: any = null;
let storage: any = null;

try {
  // Check if we have valid Firebase config
  const hasValidConfig = firebaseConfig.apiKey && 
    firebaseConfig.apiKey !== 'demo-api-key' &&
    firebaseConfig.projectId && 
    firebaseConfig.projectId !== 'demo-project';

  if (hasValidConfig) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } else {
    console.warn('Firebase configuration not found. Using mock services.');
  }
} catch (error) {
  console.warn('Firebase initialization failed:', error);
}

export { db, auth, storage };
export default app;
