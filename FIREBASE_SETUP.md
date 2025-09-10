# Firebase Setup Guide for Wiggs Law Website

## 🔥 Firebase Configuration Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `wiggslaw` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

### 3. Create Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### 4. Get Firebase Configuration

1. In your Firebase project, go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname: `wiggslaw-web`
5. Copy the Firebase configuration object

### 5. Create Environment Variables

Create a `.env.local` file in your project root with your Firebase config:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Enable Firebase (set to 'true' to use Firebase, 'false' for localStorage)
NEXT_PUBLIC_USE_FIREBASE=true

# Admin Credentials (for Firebase Auth)
ADMIN_EMAIL=admin@wiggslaw.com
ADMIN_PASSWORD=admin123
```

### 6. Create Admin User

1. In Firebase Console, go to "Authentication" > "Users"
2. Click "Add user"
3. Enter email: `admin@wiggslaw.com`
4. Enter password: `admin123` (or your preferred password)
5. Click "Add user"

### 7. Set Up Firestore Security Rules

In Firebase Console, go to "Firestore Database" > "Rules" and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - read access for everyone, write access for authenticated users
    match /blogPosts/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 8. Enable Firebase Storage (Optional)

1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode"
4. Select a location
5. Click "Done"

## 🚀 Usage

### Switch Between localStorage and Firebase

To use Firebase, set in your `.env.local`:
```env
NEXT_PUBLIC_USE_FIREBASE=true
```

To use localStorage, set:
```env
NEXT_PUBLIC_USE_FIREBASE=false
```

### Features Available

✅ **Firebase Authentication** - Secure admin login
✅ **Firestore Database** - Cloud storage for blog posts
✅ **Real-time Updates** - Live data synchronization
✅ **Scalable Storage** - No localStorage limitations
✅ **Offline Support** - Works without internet
✅ **Security Rules** - Protected data access

## 🔧 Troubleshooting

### Common Issues

1. **"Firebase not initialized"** - Check your environment variables
2. **"Permission denied"** - Verify Firestore security rules
3. **"User not authenticated"** - Check Firebase Auth setup
4. **"Network error"** - Verify Firebase project configuration

### Testing

1. Start your development server: `npm run dev`
2. Go to `/login` and test admin login
3. Go to `/admin/posts/new` and create a test post
4. Check Firebase Console to see the data

## 📱 Production Deployment

### Vercel Environment Variables

Add these to your Vercel project settings:

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add all the Firebase environment variables
3. Set `NEXT_PUBLIC_USE_FIREBASE=true` for production

### Security Considerations

1. **Update Firestore Rules** for production:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@wiggslaw.com";
    }
  }
}
```

2. **Use Strong Passwords** for admin accounts
3. **Enable App Check** for additional security
4. **Monitor Usage** in Firebase Console

## 🎉 You're All Set!

Your Wiggs Law website now has Firebase integration with:
- Secure authentication
- Cloud database
- Real-time updates
- Scalable storage
- Professional admin panel

The system will automatically use Firebase when `NEXT_PUBLIC_USE_FIREBASE=true` and fall back to localStorage when `false`.
