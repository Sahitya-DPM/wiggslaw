import { blogService, BlogPost } from './blogService';
import { firebaseBlogService } from './firebaseBlogService';

// Configuration to switch between localStorage and Firebase
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

export const hybridBlogService = {
  // Get all posts
  async getAllPosts(): Promise<BlogPost[]> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.getAllPosts();
    } else {
      return blogService.getAllPosts();
    }
  },

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.getPostById(id);
    } else {
      return blogService.getPostById(id);
    }
  },

  // Save a new post
  async savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<BlogPost> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.savePost(post);
    } else {
      return blogService.savePost(post);
    }
  },

  // Update an existing post
  async updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'views'>>): Promise<BlogPost | null> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.updatePost(id, updates);
    } else {
      return blogService.updatePost(id, updates);
    }
  },

  // Delete a post
  async deletePost(id: string): Promise<boolean> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.deletePost(id);
    } else {
      return blogService.deletePost(id);
    }
  },

  // Increment view count
  async incrementViews(id: string): Promise<void> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.incrementViews(id);
    } else {
      return blogService.incrementViews(id);
    }
  },

  // Get posts by status
  async getPostsByStatus(status: 'published' | 'draft'): Promise<BlogPost[]> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.getPostsByStatus(status);
    } else {
      return blogService.getPostsByStatus(status);
    }
  },

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.searchPosts(query);
    } else {
      return blogService.searchPosts(query);
    }
  },

  // Initialize sample data
  async initializeSampleData(): Promise<void> {
    if (USE_FIREBASE) {
      return await firebaseBlogService.initializeSampleData();
    } else {
      // For localStorage, sample data is already initialized
      return Promise.resolve();
    }
  }
};
