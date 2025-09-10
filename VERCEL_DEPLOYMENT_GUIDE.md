# Vercel Deployment Guide for WiggsLaw Blog

This guide helps you deploy your blog to Vercel with proper Firebase configuration.

## Step 1: Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_USE_FIREBASE=true
```

## Step 2: Firebase Security Rules

In Firebase Console > Firestore Database > Rules, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to blog posts
    match /posts/{document} {
      allow read: if true;  // Anyone can read blog posts
      allow write: if request.auth != null;  // Only authenticated users can write
    }
    
    // Allow public read access to other collections
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 3: Common Issues and Solutions

### Issue: Delete Button Not Working
**Cause**: Firebase authentication or permission issues
**Solution**: 
1. Check Firebase security rules
2. Verify environment variables in Vercel
3. Check browser console for error messages

### Issue: Posts Not Loading
**Cause**: Firebase configuration or network issues
**Solution**:
1. Verify all environment variables are set
2. Check Firebase project is active
3. Ensure Firestore is enabled

### Issue: Authentication Errors
**Cause**: Firebase auth configuration
**Solution**:
1. Check Firebase Auth is enabled
2. Verify domain is added to authorized domains
3. Check API keys are correct

## Step 4: Testing in Production

1. **Check Console Logs**: Open browser dev tools and check for errors
2. **Test Blog Access**: Visit `/blog` - should work without login
3. **Test Admin Functions**: Login and try creating/editing/deleting posts
4. **Check Firebase Console**: Verify data is being stored

## Step 5: Debugging Steps

### Check Environment Variables
```javascript
// Add this to any page to debug
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  useFirebase: process.env.NEXT_PUBLIC_USE_FIREBASE
});
```

### Check Firebase Connection
```javascript
// Add this to test Firebase connection
import { db } from '@/lib/firebase';
console.log('Firebase DB:', db);
```

## Step 6: Vercel Build Settings

1. **Build Command**: `npm run build`
2. **Output Directory**: `.next`
3. **Install Command**: `npm install`
4. **Node.js Version**: 18.x or higher

## Step 7: Monitoring

- Check Vercel function logs for server-side errors
- Monitor Firebase usage in Firebase Console
- Use browser dev tools to debug client-side issues

## Troubleshooting Commands

```bash
# Test locally with production environment
npm run build
npm start

# Check environment variables
vercel env ls

# View deployment logs
vercel logs
```

## Success Indicators

✅ Blog page loads without login  
✅ Admin can create/edit/delete posts  
✅ Posts are stored in Firebase  
✅ No console errors  
✅ All CRUD operations work in production  
