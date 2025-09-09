import { blogService, BlogPost } from './blogService';
import { firebaseBlogService } from './firebaseBlogService';

// Configuration to switch between localStorage and Firebase
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

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

  // Save a new post
  async savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<BlogPost> {
    return tryFirebaseFirst(
      () => firebaseBlogService.savePost(post),
      () => blogService.savePost(post)
    );
  },

  // Update an existing post
  async updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'views'>>): Promise<BlogPost | null> {
    return tryFirebaseFirst(
      () => firebaseBlogService.updatePost(id, updates),
      () => blogService.updatePost(id, updates)
    );
  },

  // Delete a post
  async deletePost(id: string): Promise<boolean> {
    return tryFirebaseFirst(
      () => firebaseBlogService.deletePost(id),
      () => blogService.deletePost(id)
    );
  },

  // Increment view count
  async incrementViews(id: string): Promise<void> {
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
