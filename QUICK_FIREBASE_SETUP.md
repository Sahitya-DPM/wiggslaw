# Quick Firebase Setup for WiggsLaw Blog

## 🚀 Fast Setup (5 minutes)

### Step 1: Run Setup Script
```bash
node setup-firebase.js
```

This will guide you through creating the `.env.local` file with your Firebase credentials.

### Step 2: Test Firebase Connection
```bash
node test-firebase.js
```

This will verify that Firebase is working and can store data.

### Step 3: Restart Development Server
```bash
npm run dev
```

Look for: `✅ Firebase initialized successfully with real configuration`

## 🔧 Manual Setup

If you prefer to set up manually:

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database in test mode

### 2. Get Configuration
1. Go to Project Settings > General > Your apps
2. Add a Web app
3. Copy the configuration

### 3. Create .env.local
Create `.env.local` in your project root:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_USE_FIREBASE=true
```

### 4. Set Firestore Rules
In Firebase Console > Firestore Database > Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## ✅ Verification

After setup, you should see:
- `✅ Firebase initialized successfully with real configuration`
- Blog posts are stored in Firebase Console
- Data persists between page refreshes
- Admin functions work properly

## 🆘 Troubleshooting

**Still seeing demo configuration?**
- Check `.env.local` file exists
- Verify all environment variables are set
- Restart development server

**Firebase connection failed?**
- Check your API key is correct
- Verify project is active in Firebase Console
- Ensure Firestore is enabled

**Data not saving?**
- Check Firestore security rules
- Verify authentication is working
- Check browser console for errors
