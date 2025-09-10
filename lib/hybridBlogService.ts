import { blogService, BlogPost, initializeSampleData } from './blogService';
import { firebaseBlogService } from './firebaseBlogService';

// Configuration to switch between localStorage and Firebase
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

// Always use Firebase for write operations (save, update, delete)
const ALWAYS_USE_FIREBASE_FOR_WRITES = USE_FIREBASE;

// Always try to use Firebase for reads to fetch from shared "posts" collection
const ALWAYS_TRY_FIREBASE_FOR_READS = true;


// Helper function to try Firebase first, fallback to localStorage
const tryFirebaseFirst = async <T>(
  firebaseOperation: () => Promise<T>,
  localStorageOperation: () => T
): Promise<T> => {
  if (USE_FIREBASE) {
    try {
      return await firebaseOperation();
    } catch (error) {
      console.warn('Firebase operation failed, falling back to localStorage:', error);
      return localStorageOperation();
    }
  } else {
    return localStorageOperation();
  }
};

export const hybridBlogService = {
  // Get all posts - Always fetch from Firestore "posts" collection, ordered by createdAt descending
  async getAllPosts(): Promise<BlogPost[]> {
    if (ALWAYS_TRY_FIREBASE_FOR_READS) {
      try {
        // Always try to fetch from Firestore first
        const posts = await firebaseBlogService.getAllPosts();
        
        // If we got posts from Firestore, return them
        if (posts.length > 0) {
          return posts;
        }
        
        // If no posts in Firestore, fall back to localStorage
        const localPosts = blogService.getAllPosts();
        if (localPosts.length > 0) {
          return localPosts;
        }
        
        // If no posts anywhere, ensure sample data is available
        const sampleData = initializeSampleData();
        return sampleData;
      } catch (error) {
        console.error('Error fetching posts from Firestore:', error);
        
        // Fall back to localStorage on Firestore error
        try {
          const localPosts = blogService.getAllPosts();
          if (localPosts.length > 0) {
            return localPosts;
          }
          
          // If no posts in localStorage either, ensure sample data is available
          const sampleData = initializeSampleData();
          return sampleData;
        } catch (localError) {
          console.error('Error fetching posts from localStorage:', localError);
          // Last resort: return sample data
          const sampleData = initializeSampleData();
          return sampleData;
        }
      }
    } else {
      // Use localStorage only if Firebase is disabled
      return blogService.getAllPosts();
    }
  },

  // Get a single post by ID - Always fetch from Firestore first
  async getPostById(id: string): Promise<BlogPost | null> {
    if (ALWAYS_TRY_FIREBASE_FOR_READS) {
      try {
        // Try Firestore first
        const post = await firebaseBlogService.getPostById(id);
        if (post) {
          return post;
        }
        
        // Fall back to localStorage
        return blogService.getPostById(id);
      } catch (error) {
        console.error('Error fetching post from Firestore:', error);
        return blogService.getPostById(id);
      }
    } else {
      return blogService.getPostById(id);
    }
  },

  // Get a single post by slug - Always fetch from Firestore first
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (ALWAYS_TRY_FIREBASE_FOR_READS) {
      try {
        // Try Firestore first
        const post = await firebaseBlogService.getPostBySlug(slug);
        if (post) {
          return post;
        }
        
        // Fall back to localStorage
        return blogService.getPostBySlug(slug);
      } catch (error) {
        console.error('Error fetching post from Firestore:', error);
        return blogService.getPostBySlug(slug);
      }
    } else {
      return blogService.getPostBySlug(slug);
    }
  },

  // Save a new post
  async savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<BlogPost> {
    // Always save to localStorage first for reliability
    const savedPost = blogService.savePost(post);
    
    // If Firebase is enabled, also try to save there
    if (USE_FIREBASE) {
      try {
        await firebaseBlogService.savePost(post);
        console.log('Post also saved to Firebase');
      } catch (error) {
        console.warn('Firebase save failed, but post saved to localStorage:', error);
      }
    }
    
    return savedPost;
  },

  // Update an existing post
  async updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'views'>>): Promise<BlogPost | null> {
    console.log('🔄 Hybrid: Updating post:', id);
    console.log('📝 Hybrid: Update data:', updates);
    
    // If Firebase is enabled, prioritize Firebase for updates
    if (USE_FIREBASE) {
      try {
        console.log('🔥 Hybrid: Updating in Firebase first...');
        const firebaseResult = await firebaseBlogService.updatePost(id, updates);
        console.log('🔥 Hybrid: Firebase update result:', firebaseResult ? 'Success' : 'Failed');
        
        if (firebaseResult) {
          // Sync the updated post back to localStorage
          console.log('💾 Hybrid: Syncing updated post to localStorage...');
          const localPosts = blogService.getAllPosts();
          const existingIndex = localPosts.findIndex(post => post.id === id);
          
          if (existingIndex !== -1) {
            // Update existing post in localStorage
            localPosts[existingIndex] = firebaseResult;
            blogService.savePosts(localPosts);
            console.log('✅ Post updated in Firebase and synced to localStorage');
          } else {
            // Add new post to localStorage
            localPosts.push(firebaseResult);
            blogService.savePosts(localPosts);
            console.log('✅ Post updated in Firebase and added to localStorage');
          }
          
          return firebaseResult;
        } else {
          console.warn('⚠️ Firebase update failed, trying localStorage fallback...');
        }
      } catch (error) {
        console.error('❌ Firebase update failed:', error);
        console.warn('⚠️ Firebase update failed, trying localStorage fallback...');
      }
    }
    
    // Fallback to localStorage if Firebase is disabled or failed
    console.log('💾 Hybrid: Updating in localStorage...');
    const updatedPost = blogService.updatePost(id, updates);
    console.log('💾 Hybrid: Local update result:', updatedPost ? 'Success' : 'Failed');
    
    console.log('📊 Hybrid: Final update result:', updatedPost ? 'Success' : 'Failed');
    return updatedPost;
  },

  // Delete a post
  async deletePost(id: string): Promise<boolean> {
    console.log('🗑️ Hybrid: Deleting post:', id);
    
    // If Firebase is enabled, prioritize Firebase for deletes
    if (USE_FIREBASE) {
      try {
        console.log('🔥 Hybrid: Deleting from Firebase first...');
        const firebaseDeleted = await firebaseBlogService.deletePost(id);
        console.log('🔥 Hybrid: Firebase delete result:', firebaseDeleted ? 'Success' : 'Failed');
        
        if (firebaseDeleted) {
          // Also delete from localStorage
          console.log('💾 Hybrid: Deleting from localStorage...');
          const localDeleted = blogService.deletePost(id);
          console.log('💾 Hybrid: Local delete result:', localDeleted ? 'Success' : 'Failed');
          
          console.log('✅ Post deleted from both Firebase and localStorage');
          return true;
        } else {
          console.warn('⚠️ Firebase delete failed, trying localStorage fallback...');
        }
      } catch (error) {
        console.error('❌ Firebase delete failed:', error);
        console.warn('⚠️ Firebase delete failed, trying localStorage fallback...');
      }
    }
    
    // Fallback to localStorage if Firebase is disabled or failed
    console.log('💾 Hybrid: Deleting from localStorage...');
    const localDeleted = blogService.deletePost(id);
    console.log('💾 Hybrid: Local delete result:', localDeleted ? 'Success' : 'Failed');
    
    return localDeleted;
  },

  // Increment view count
  async incrementViews(id: string): Promise<void> {
    // Always increment in localStorage first for reliability
    blogService.incrementViews(id);
    
    // If Firebase is enabled, also try to increment there
    if (USE_FIREBASE) {
      try {
        await firebaseBlogService.incrementViews(id);
        console.log('Views also incremented in Firebase');
      } catch (error) {
        console.warn('Firebase increment views failed, but views incremented in localStorage:', error);
      }
    }
  },

  // Get posts by status - Always fetch from Firestore first
  async getPostsByStatus(status: 'published' | 'draft'): Promise<BlogPost[]> {
    if (ALWAYS_TRY_FIREBASE_FOR_READS) {
      try {
        // Try Firestore first
        const posts = await firebaseBlogService.getPostsByStatus(status);
        if (posts.length > 0) {
          return posts;
        }
        
        // Fall back to localStorage
        return blogService.getPostsByStatus(status);
      } catch (error) {
        console.error('Error fetching posts from Firestore:', error);
        return blogService.getPostsByStatus(status);
      }
    } else {
      return blogService.getPostsByStatus(status);
    }
  },

  // Search posts - Always fetch from Firestore first
  async searchPosts(query: string): Promise<BlogPost[]> {
    if (ALWAYS_TRY_FIREBASE_FOR_READS) {
      try {
        // Try Firestore first
        const posts = await firebaseBlogService.searchPosts(query);
        if (posts.length > 0) {
          return posts;
        }
        
        // Fall back to localStorage
        return blogService.searchPosts(query);
      } catch (error) {
        console.error('Error searching posts in Firestore:', error);
        return blogService.searchPosts(query);
      }
    } else {
      return blogService.searchPosts(query);
    }
  },

  // Initialize sample data
  async initializeSampleData(): Promise<void> {
    if (USE_FIREBASE) {
      try {
        return await firebaseBlogService.initializeSampleData();
      } catch (error) {
        console.warn('Firebase initializeSampleData failed, falling back to localStorage:', error);
        return Promise.resolve(); // For localStorage, sample data is already initialized
      }
    } else {
      return Promise.resolve(); // For localStorage, sample data is already initialized
    }
  }
};
