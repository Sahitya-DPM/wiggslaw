# Firebase Setup Guide for Blog Posts

This guide will help you set up Firebase to store and display blog posts without requiring login.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `wiggslaw-blog` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll update rules later)
4. Select a location close to your users
5. Click "Done"

## Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web app (</> icon)
4. Register your app with a name like "WiggsLaw Blog"
5. Copy the Firebase configuration object

## Step 4: Create Environment File

Create a `.env.local` file in your project root with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_USE_FIREBASE=true
```

## Step 5: Configure Firestore Security Rules

In Firebase Console > Firestore Database > Rules, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to blog posts
    match /posts/{document} {
      allow read: if true;  // Anyone can read blog posts
      allow write: if request.auth != null;  // Only authenticated users can write
    }
    
    // Allow public read access to other collections if needed
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/blog` - you should see sample blog posts
3. Go to `http://localhost:3000/admin/posts/new` to create a new blog post
4. The new post should be saved to Firebase and appear on the blog page

## Step 7: Verify Firebase Storage

1. In Firebase Console > Firestore Database
2. You should see a "posts" collection
3. Each blog post will be stored as a document with auto-generated ID
4. Posts are ordered by `createdAt` field in descending order

## Troubleshooting

- **Posts not showing**: Check browser console for errors
- **Firebase connection issues**: Verify your `.env.local` file has correct values
- **Permission denied**: Check Firestore security rules
- **Build errors**: Make sure all environment variables are prefixed with `NEXT_PUBLIC_`

## Features Enabled

✅ **Public blog access** - No login required to read posts  
✅ **Firebase storage** - All posts stored in Firestore  
✅ **Real-time updates** - Changes reflect immediately  
✅ **Ordered display** - Posts sorted by creation date (newest first)  
✅ **Admin interface** - Create/edit posts through admin panel  
✅ **Fallback support** - Works even if Firebase is unavailable  
