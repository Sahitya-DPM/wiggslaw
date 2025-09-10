#!/usr/bin/env node

/**
 * Debug Update Functionality
 * This script helps debug why updatePost returns null
 */

require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy } = require('firebase/firestore');

console.log('🔍 Debugging Update Functionality...\n');

// Check environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function debugUpdate() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('📋 Checking Firebase posts...');
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    console.log(`📊 Total posts in Firebase: ${querySnapshot.docs.length}`);
    
    if (querySnapshot.docs.length > 0) {
      console.log('\n📝 Firebase Posts:');
      querySnapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        console.log(`${index + 1}. ID: ${doc.id}`);
        console.log(`   Title: ${data.title}`);
        console.log(`   Status: ${data.status}`);
        console.log(`   Created: ${data.createdAt?.toDate?.()?.toISOString() || data.createdAt}`);
        console.log('');
      });
    }
    
    // Check localStorage simulation
    console.log('💾 Checking localStorage simulation...');
    console.log('Note: localStorage is only available in browser environment');
    console.log('The issue might be that post IDs in Firebase don\'t match localStorage IDs');
    
    console.log('\n🔧 Potential Issues:');
    console.log('1. Post ID mismatch between Firebase and localStorage');
    console.log('2. Post not found in localStorage but exists in Firebase');
    console.log('3. Update operation succeeds but returns null due to ID mismatch');
    
    console.log('\n💡 Solution:');
    console.log('The hybrid service should prioritize Firebase for reads and updates');
    console.log('and sync changes to localStorage, not the other way around');
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugUpdate();
