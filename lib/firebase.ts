import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDemoKey123456789',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'wiggslaw-demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'wiggslaw-demo',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'wiggslaw-demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456789'
};

// Check if we're using demo/placeholder values
const isUsingDemoConfig = firebaseConfig.apiKey === 'AIzaSyDemoKey123456789';

// Only initialize Firebase if we have valid config
let app: any = null;
let db: any = null;
let auth: any = null;
let storage: any = null;

try {
  // Always try to initialize Firebase with the provided config
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
  
  if (isUsingDemoConfig) {
    console.warn('⚠️ Using demo Firebase configuration. Data will be saved to localStorage only.');
    console.warn('To enable real Firebase, create a .env.local file with your Firebase credentials.');
    console.warn('See FIREBASE_SETUP.md for detailed instructions.');
  } else {
    console.log('✅ Firebase initialized successfully with real configuration');
  }
} catch (error) {
  console.warn('❌ Firebase initialization failed:', error);
  if (isUsingDemoConfig) {
    console.warn('This is expected with demo configuration. Data will be saved to localStorage.');
  }
  // Set to null so other services can handle gracefully
  app = null;
  db = null;
  auth = null;
  storage = null;
}

export { db, auth, storage };
export default app;
