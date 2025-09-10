import { blogService, BlogPost } from './blogService';
import { firebaseBlogService } from './firebaseBlogService';

// Configuration to switch between localStorage and Firebase
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

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
    if (USE_FIREBASE) {
      try {
        return await firebaseBlogService.getAllPosts();
      } catch (error) {
        console.warn('Firebase getAllPosts failed, falling back to localStorage:', error);
        // Ensure localStorage has sample data if Firebase fails
        const localPosts = blogService.getAllPosts();
        if (localPosts.length === 0) {
          console.log('No posts in localStorage, initializing with sample data...');
          // Initialize with sample data
          blogService.savePosts([
            {
              id: '1',
              title: 'Understanding Bankruptcy Law: A Complete Guide',
              slug: 'understanding-bankruptcy-law-complete-guide',
              excerpt: 'Learn about the different types of bankruptcy and how they can help you get back on track financially.',
              content: '# Understanding Bankruptcy Law: A Complete Guide\n\nBankruptcy can be a complex and overwhelming process, but understanding the basics can help you make informed decisions about your financial future.\n\n## Types of Bankruptcy\n\n### Chapter 7 Bankruptcy\nChapter 7 bankruptcy, also known as "liquidation bankruptcy," is designed for individuals with limited income who cannot pay their debts.\n\n### Chapter 13 Bankruptcy\nChapter 13 bankruptcy, also known as "reorganization bankruptcy," allows individuals with regular income to create a repayment plan.\n\n*This article is for informational purposes only and does not constitute legal advice.*',
              publishedAt: '2024-01-15',
              status: 'published',
              views: 1250,
              author: 'Geoff Wiggs',
              category: 'Bankruptcy',
              createdAt: '2024-01-15T10:00:00Z',
              updatedAt: '2024-01-15T10:00:00Z',
              imageUrl: '/images/AdobeStock_251049533-2-scaled.webp',
              imageAlt: 'Bankruptcy law consultation',
              featuredImage: '/images/AdobeStock_251049533-2-scaled.webp',
              publishDate: '2024-01-15'
            },
            {
              id: '2',
              title: 'Estate Planning: Protecting Your Family\'s Future',
              slug: 'estate-planning-protecting-family-future',
              excerpt: 'Essential steps to ensure your assets are protected and your wishes are carried out.',
              content: '# Estate Planning: Protecting Your Family\'s Future\n\nEstate planning is one of the most important things you can do to protect your family and ensure your wishes are carried out after you\'re gone.\n\n## What is Estate Planning?\n\nEstate planning involves making decisions about how your assets will be managed and distributed after your death.\n\n*This article is for informational purposes only and does not constitute legal advice.*',
              publishedAt: '2024-01-10',
              status: 'published',
              views: 890,
              author: 'Nadya Machrus',
              category: 'Estate Planning',
              createdAt: '2024-01-10T10:00:00Z',
              updatedAt: '2024-01-10T10:00:00Z',
              imageUrl: '/images/AdobeStock_303448308-scaled.webp',
              imageAlt: 'Estate planning documents',
              featuredImage: '/images/AdobeStock_303448308-scaled.webp',
              publishDate: '2024-01-10'
            }
          ]);
          return blogService.getAllPosts();
        }
        return localPosts;
      }
    } else {
      return blogService.getAllPosts();
    }
  },

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    if (USE_FIREBASE) {
      try {
        return await firebaseBlogService.getPostById(id);
      } catch (error) {
        console.warn('Firebase getPostById failed, falling back to localStorage:', error);
        // Ensure localStorage has sample data if Firebase fails
        const localPosts = blogService.getAllPosts();
        if (localPosts.length === 0) {
          await this.getAllPosts(); // This will initialize sample data
        }
        return blogService.getPostById(id);
      }
    } else {
      return blogService.getPostById(id);
    }
  },

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (USE_FIREBASE) {
      try {
        return await firebaseBlogService.getPostBySlug(slug);
      } catch (error) {
        console.warn('Firebase getPostBySlug failed, falling back to localStorage:', error);
        // Ensure localStorage has sample data if Firebase fails
        const localPosts = blogService.getAllPosts();
        if (localPosts.length === 0) {
          await this.getAllPosts(); // This will initialize sample data
        }
        return blogService.getPostBySlug(slug);
      }
    } else {
      return blogService.getPostBySlug(slug);
    }
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
    return blogService.incrementViews(id);
  },

  // Get posts by status
  async getPostsByStatus(status: 'published' | 'draft'): Promise<BlogPost[]> {
    if (USE_FIREBASE) {
      try {
        return await firebaseBlogService.getPostsByStatus(status);
      } catch (error) {
        console.warn('Firebase getPostsByStatus failed, falling back to localStorage:', error);
        // Ensure localStorage has sample data if Firebase fails
        const localPosts = blogService.getAllPosts();
        if (localPosts.length === 0) {
          await this.getAllPosts(); // This will initialize sample data
        }
        return blogService.getPostsByStatus(status);
      }
    } else {
      return blogService.getPostsByStatus(status);
    }
  },

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    if (USE_FIREBASE) {
      try {
        return await firebaseBlogService.searchPosts(query);
      } catch (error) {
        console.warn('Firebase searchPosts failed, falling back to localStorage:', error);
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
