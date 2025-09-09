import { blogService, BlogPost } from './blogService';
import { firebaseBlogService } from './firebaseBlogService';

// Configuration to switch between localStorage and Firebase
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true' || true; // Always try Firebase

// Always use Firebase for write operations (save, update, delete)
const ALWAYS_USE_FIREBASE_FOR_WRITES = true;

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
    return tryFirebaseFirst(
      () => firebaseBlogService.getAllPosts(),
      () => blogService.getAllPosts()
    );
  },

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    return tryFirebaseFirst(
      () => firebaseBlogService.getPostById(id),
      () => blogService.getPostById(id)
    );
  },

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return tryFirebaseFirst(
      () => firebaseBlogService.getPostBySlug(slug),
      () => blogService.getPostBySlug(slug)
    );
  },

  // Save a new post - always use Firebase
  async savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<BlogPost> {
    if (ALWAYS_USE_FIREBASE_FOR_WRITES) {
      try {
        return await firebaseBlogService.savePost(post);
      } catch (error) {
        console.warn('Firebase save failed, falling back to localStorage:', error);
        return blogService.savePost(post);
      }
    }
    return tryFirebaseFirst(
      () => firebaseBlogService.savePost(post),
      () => blogService.savePost(post)
    );
  },

  // Update an existing post - always use Firebase
  async updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'views'>>): Promise<BlogPost | null> {
    if (ALWAYS_USE_FIREBASE_FOR_WRITES) {
      try {
        return await firebaseBlogService.updatePost(id, updates);
      } catch (error) {
        console.warn('Firebase update failed, falling back to localStorage:', error);
        return blogService.updatePost(id, updates);
      }
    }
    return tryFirebaseFirst(
      () => firebaseBlogService.updatePost(id, updates),
      () => blogService.updatePost(id, updates)
    );
  },

  // Delete a post - always use Firebase
  async deletePost(id: string): Promise<boolean> {
    if (ALWAYS_USE_FIREBASE_FOR_WRITES) {
      try {
        return await firebaseBlogService.deletePost(id);
      } catch (error) {
        console.warn('Firebase delete failed, falling back to localStorage:', error);
        return blogService.deletePost(id);
      }
    }
    return tryFirebaseFirst(
      () => firebaseBlogService.deletePost(id),
      () => blogService.deletePost(id)
    );
  },

  // Increment view count - always use Firebase
  async incrementViews(id: string): Promise<void> {
    if (ALWAYS_USE_FIREBASE_FOR_WRITES) {
      try {
        return await firebaseBlogService.incrementViews(id);
      } catch (error) {
        console.warn('Firebase increment views failed, falling back to localStorage:', error);
        return blogService.incrementViews(id);
      }
    }
    return tryFirebaseFirst(
      () => firebaseBlogService.incrementViews(id),
      () => blogService.incrementViews(id)
    );
  },

  // Get posts by status
  async getPostsByStatus(status: 'published' | 'draft'): Promise<BlogPost[]> {
    return tryFirebaseFirst(
      () => firebaseBlogService.getPostsByStatus(status),
      () => blogService.getPostsByStatus(status)
    );
  },

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    return tryFirebaseFirst(
      () => firebaseBlogService.searchPosts(query),
      () => blogService.searchPosts(query)
    );
  },

  // Initialize sample data
  async initializeSampleData(): Promise<void> {
    return tryFirebaseFirst(
      () => firebaseBlogService.initializeSampleData(),
      () => Promise.resolve() // For localStorage, sample data is already initialized
    );
  }
};
