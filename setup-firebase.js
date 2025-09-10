#!/usr/bin/env node

/**
 * Firebase Setup Script for WiggsLaw Blog
 * This script helps you set up Firebase and create the .env.local file
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔥 Firebase Setup for WiggsLaw Blog');
console.log('=====================================\n');

console.log('📋 Step 1: Create Firebase Project');
console.log('1. Go to https://console.firebase.google.com/');
console.log('2. Click "Create a project" or "Add project"');
console.log('3. Enter project name: wiggslaw-blog (or your preferred name)');
console.log('4. Enable Google Analytics (optional)');
console.log('5. Click "Create project"\n');

console.log('📋 Step 2: Enable Firestore Database');
console.log('1. In your Firebase project, go to "Firestore Database"');
console.log('2. Click "Create database"');
console.log('3. Choose "Start in test mode"');
console.log('4. Select a location close to your users');
console.log('5. Click "Done"\n');

console.log('📋 Step 3: Get Firebase Configuration');
console.log('1. Go to Project Settings (gear icon)');
console.log('2. Scroll down to "Your apps" section');
console.log('3. Click "Add app" and select Web app (</> icon)');
console.log('4. Register your app with a name like "WiggsLaw Blog"');
console.log('5. Copy the Firebase configuration object\n');

console.log('📋 Step 4: Configure Firestore Security Rules');
console.log('In Firebase Console > Firestore Database > Rules, use:');
console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{document} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null;  // Auth required for writes
    }
  }
}
`);

console.log('Now let\'s create your .env.local file...\n');

const questions = [
  {
    key: 'NEXT_PUBLIC_FIREBASE_API_KEY',
    prompt: 'Enter your Firebase API Key: ',
    example: 'AIzaSy...'
  },
  {
    key: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    prompt: 'Enter your Auth Domain: ',
    example: 'your-project-id.firebaseapp.com'
  },
  {
    key: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    prompt: 'Enter your Project ID: ',
    example: 'your-project-id'
  },
  {
    key: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    prompt: 'Enter your Storage Bucket: ',
    example: 'your-project-id.appspot.com'
  },
  {
    key: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    prompt: 'Enter your Messaging Sender ID: ',
    example: '123456789012'
  },
  {
    key: 'NEXT_PUBLIC_FIREBASE_APP_ID',
    prompt: 'Enter your App ID: ',
    example: '1:123456789012:web:abcdef123456789'
  }
];

const answers = {};

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question.prompt, (answer) => {
      if (answer.trim()) {
        answers[question.key] = answer.trim();
      }
      resolve();
    });
  });
}

async function main() {
  console.log('Please enter your Firebase configuration values:\n');
  
  for (const question of questions) {
    console.log(`Example: ${question.example}`);
    await askQuestion(question);
    console.log('');
  }
  
  // Add the USE_FIREBASE flag
  answers['NEXT_PUBLIC_USE_FIREBASE'] = 'true';
  
  // Create .env.local content
  const envContent = Object.entries(answers)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  // Write .env.local file
  const envPath = path.join(__dirname, '.env.local');
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ .env.local file created successfully!');
  console.log('📁 Location:', envPath);
  console.log('\n📋 Next Steps:');
  console.log('1. Restart your development server: npm run dev');
  console.log('2. Check the console for "✅ Firebase initialized successfully"');
  console.log('3. Test creating a blog post in the admin panel');
  console.log('4. Check Firebase Console to see your data');
  
  rl.close();
}

main().catch(console.error);
