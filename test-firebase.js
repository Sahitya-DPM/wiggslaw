#!/usr/bin/env node

/**
 * Firebase Connection Test Script
 * This script tests if Firebase is properly configured and can store data
 */

require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, orderBy } = require('firebase/firestore');

console.log('🧪 Testing Firebase Connection...\n');

// Check environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

console.log('📋 Checking Environment Variables:');
let allEnvVarsPresent = true;

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value && value !== 'AIzaSyDemoKey123456789') {
    console.log(`✅ ${envVar}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`❌ ${envVar}: Missing or using demo value`);
    allEnvVarsPresent = false;
  }
});

if (!allEnvVarsPresent) {
  console.log('\n❌ Please run: node setup-firebase.js');
  process.exit(1);
}

console.log('\n📋 Testing Firebase Connection:');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function testFirebase() {
  try {
    // Initialize Firebase
    console.log('1. Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');

    // Test writing data
    console.log('2. Testing data write...');
    const testPost = {
      title: 'Firebase Test Post',
      slug: 'firebase-test-post',
      excerpt: 'This is a test post to verify Firebase connection',
      content: '# Firebase Test\n\nThis post was created to test Firebase connectivity.',
      publishedAt: new Date().toISOString(),
      status: 'published',
      views: 0,
      author: 'System Test',
      category: 'Test',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'posts'), testPost);
    console.log('✅ Test post written successfully');
    console.log('📄 Document ID:', docRef.id);

    // Test reading data
    console.log('3. Testing data read...');
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    console.log('✅ Data read successfully');
    console.log('📊 Total posts in database:', querySnapshot.docs.length);

    console.log('\n🎉 Firebase is working correctly!');
    console.log('📋 Next steps:');
    console.log('1. Restart your development server: npm run dev');
    console.log('2. Create a blog post in the admin panel');
    console.log('3. Check Firebase Console to see your data');

  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your Firebase project is active');
    console.log('2. Verify Firestore is enabled');
    console.log('3. Check your security rules allow writes');
    console.log('4. Verify your API key is correct');
  }
}

testFirebase();
