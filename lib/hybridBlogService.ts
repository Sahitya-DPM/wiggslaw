import { blogService, BlogPost } from './blogService';
import { firebaseBlogService } from './firebaseBlogService';

// Configuration to switch between localStorage and Firebase
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

// Always use Firebase for write operations (save, update, delete)
const ALWAYS_USE_FIREBASE_FOR_WRITES = USE_FIREBASE;


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
  // Get all posts
  async getAllPosts(): Promise<BlogPost[]> {
    // Always try localStorage first for reliability
    const localPosts = blogService.getAllPosts();
    
    // If we have posts in localStorage, return them
    if (localPosts.length > 0) {
      return localPosts;
    }
    
    // If no posts in localStorage and Firebase is enabled, try Firebase
    if (USE_FIREBASE) {
      try {
        const posts = await firebaseBlogService.getAllPosts();
        
        // If we got posts from Firebase, save them to localStorage for future use
        if (posts.length > 0) {
          blogService.savePosts(posts);
        }
        
        return posts;
      } catch (error) {
        console.warn('Firebase getAllPosts failed:', error);
        // Fall through to sample data initialization
      }
    }
    
    // If we reach here, either Firebase is disabled or failed, and localStorage is empty
    // The blogService.getAllPosts() should have already initialized sample data
    // But let's make sure by calling it again
    const finalPosts = blogService.getAllPosts();
    return finalPosts;
  },

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    // Always use localStorage for reads
    return blogService.getPostById(id);
  },

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    // Always use localStorage for reads
    return blogService.getPostBySlug(slug);
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
    // Always update localStorage first for reliability
    const updatedPost = blogService.updatePost(id, updates);
    
    // If Firebase is enabled, also try to update there
    if (USE_FIREBASE) {
      try {
        await firebaseBlogService.updatePost(id, updates);
        console.log('Post also updated in Firebase');
      } catch (error) {
        console.warn('Firebase update failed, but post updated in localStorage:', error);
      }
    }
    
    return updatedPost;
  },

  // Delete a post
  async deletePost(id: string): Promise<boolean> {
    // Always delete from localStorage first for reliability
    const deleted = blogService.deletePost(id);
    
    // If Firebase is enabled, also try to delete there
    if (USE_FIREBASE) {
      try {
        await firebaseBlogService.deletePost(id);
        console.log('Post also deleted from Firebase');
      } catch (error) {
        console.warn('Firebase delete failed, but post deleted from localStorage:', error);
      }
    }
    
    return deleted;
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

  // Get posts by status
  async getPostsByStatus(status: 'published' | 'draft'): Promise<BlogPost[]> {
    // Always use localStorage for reads
    return blogService.getPostsByStatus(status);
  },

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    // Always use localStorage for reads
    return blogService.searchPosts(query);
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
