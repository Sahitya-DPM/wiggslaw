import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { BlogPost } from './blogService';

// Using 'posts' collection directly for all operations

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

export const firebaseBlogService = {
  // Get all posts - Always fetch from Firestore "posts" collection, ordered by createdAt descending
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      
      // Query the "posts" collection, ordered by createdAt descending
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost));
    } catch (error) {
      console.error('Error getting posts from Firestore:', error);
      throw error; // Re-throw to trigger fallback
    }
  },

  // Get a single post by ID - Fetch from Firestore "posts" collection
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as BlogPost;
      }
      return null;
    } catch (error) {
      console.error('Error getting post from Firestore:', error);
      throw error; // Re-throw to trigger fallback
    }
  },

  // Get a single post by slug - Fetch from Firestore "posts" collection
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      
      const q = query(collection(db, 'posts'), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as BlogPost;
      }
      return null;
    } catch (error) {
      console.error('Error getting post by slug from Firestore:', error);
      throw error; // Re-throw to trigger fallback
    }
  },

  // Save a new post
  async savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'>): Promise<BlogPost> {
    try {
      console.log('Firebase savePost called with:', post);
      console.log('Database object:', db);
      
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      
      const postWithSlug = {
        ...post,
        slug: generateSlug(post.title)
      };
      
      console.log('Post with slug:', postWithSlug);
      
      const docRef = await addDoc(collection(db, 'posts'), {
        ...postWithSlug,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0
      });
      
      console.log('Document created with ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...postWithSlug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0
      };
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  },

  // Update an existing post
  async updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'views'>>): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, 'posts', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // Return updated post
      const updatedDoc = await getDoc(docRef);
      if (updatedDoc.exists()) {
        return {
          id: updatedDoc.id,
          ...updatedDoc.data()
        } as BlogPost;
      }
      return null;
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  },

  // Delete a post
  async deletePost(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'posts', id));
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  },

  // Increment view count
  async incrementViews(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentViews = docSnap.data().views || 0;
        await updateDoc(docRef, {
          views: currentViews + 1,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  },

  // Get posts by status - Fetch from Firestore "posts" collection, ordered by createdAt descending
  async getPostsByStatus(status: 'published' | 'draft'): Promise<BlogPost[]> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      
      const q = query(
        collection(db, 'posts'), 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost));
    } catch (error) {
      console.error('Error getting posts by status from Firestore:', error);
      throw error; // Re-throw to trigger fallback
    }
  },

  // Search posts
  async searchPosts(queryText: string): Promise<BlogPost[]> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation - for production, consider using Algolia or similar
      const allPosts = await this.getAllPosts();
      const lowercaseQuery = queryText.toLowerCase();
      
      return allPosts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.author.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error; // Re-throw to trigger fallback
    }
  },

  // Initialize with sample data (for development)
  async initializeSampleData(): Promise<void> {
    try {
      const existingPosts = await this.getAllPosts();
      if (existingPosts.length > 0) return; // Already initialized
      
      const samplePosts = [
        {
          title: 'Understanding Bankruptcy Law: A Complete Guide',
          excerpt: 'Learn about the different types of bankruptcy and how they can help you get back on track financially.',
          content: `# Understanding Bankruptcy Law: A Complete Guide

Bankruptcy can be a complex and overwhelming process, but understanding the basics can help you make informed decisions about your financial future.

## Types of Bankruptcy

### Chapter 7 Bankruptcy
Chapter 7 bankruptcy, also known as "liquidation bankruptcy," is designed for individuals with limited income who cannot pay their debts. This type of bankruptcy:

- Eliminates most unsecured debts
- Requires passing a means test
- May require selling non-exempt assets
- Provides a fresh start for qualifying individuals

### Chapter 13 Bankruptcy
Chapter 13 bankruptcy, also known as "reorganization bankruptcy," allows individuals with regular income to create a repayment plan. This type of bankruptcy:

- Allows you to keep your property
- Creates a 3-5 year repayment plan
- Can stop foreclosure proceedings
- May reduce the total amount you owe

## The Bankruptcy Process

1. **Credit Counseling**: Before filing, you must complete a credit counseling course
2. **Filing the Petition**: Submit your bankruptcy petition and required documents
3. **Automatic Stay**: Creditors must stop collection efforts immediately
4. **Meeting of Creditors**: Attend a meeting with your trustee and creditors
5. **Discharge**: Receive your discharge order, eliminating eligible debts

*This article is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for advice specific to your situation.*`,
          publishedAt: '2024-01-15',
          status: 'published' as const,
          author: 'Geoff Wiggs',
          category: 'Bankruptcy',
          imageUrl: '/images/AdobeStock_251049533-2-scaled.webp',
          imageAlt: 'Bankruptcy law consultation',
          featuredImage: '/images/AdobeStock_251049533-2-scaled.webp',
          publishDate: '2024-01-15'
        },
        {
          title: 'Estate Planning: Protecting Your Family\'s Future',
          excerpt: 'Essential steps to ensure your assets are protected and your wishes are carried out.',
          content: `# Estate Planning: Protecting Your Family's Future

Estate planning is one of the most important things you can do to protect your family and ensure your wishes are carried out after you're gone.

## What is Estate Planning?

Estate planning involves making decisions about how your assets will be managed and distributed after your death. It includes:

- Creating a will or trust
- Designating beneficiaries
- Planning for incapacity
- Minimizing taxes
- Protecting your family's future

## Essential Estate Planning Documents

### 1. Last Will and Testament
A will is a legal document that specifies how you want your assets distributed after your death. It also allows you to:
- Name guardians for minor children
- Designate an executor
- Specify funeral arrangements

### 2. Living Trust
A living trust allows you to transfer assets to a trust during your lifetime, providing:
- Privacy (unlike a will, trusts are not public)
- Avoidance of probate
- Management of assets if you become incapacitated

*This article is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for advice specific to your situation.*`,
          publishedAt: '2024-01-10',
          status: 'published' as const,
          author: 'Nadya Machrus',
          category: 'Estate Planning',
          imageUrl: '/images/AdobeStock_303448308-scaled.webp',
          imageAlt: 'Estate planning documents',
          featuredImage: '/images/AdobeStock_303448308-scaled.webp',
          publishDate: '2024-01-10'
        }
      ];

      // Add sample posts to Firestore
      for (const post of samplePosts) {
        await this.savePost(post);
      }
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }
};
