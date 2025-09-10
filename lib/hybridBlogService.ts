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
    try {
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
            return posts;
          }
        } catch (error) {
          console.warn('Firebase getAllPosts failed:', error);
          // Fall through to sample data initialization
        }
      }
      
      // If we reach here, either Firebase is disabled or failed, and localStorage is empty
      // Force initialize sample data
      const sampleData = [
        {
          id: '1',
          title: 'Understanding Bankruptcy Law: A Complete Guide',
          slug: 'understanding-bankruptcy-law-complete-guide',
          excerpt: 'Learn about the different types of bankruptcy and how they can help you get back on track financially.',
          content: '# Understanding Bankruptcy Law: A Complete Guide\n\nBankruptcy can be a complex and overwhelming process, but understanding the basics can help you make informed decisions about your financial future.\n\n## Types of Bankruptcy\n\n### Chapter 7 Bankruptcy\nChapter 7 bankruptcy, also known as "liquidation bankruptcy," is designed for individuals with limited income who cannot pay their debts.\n\n### Chapter 13 Bankruptcy\nChapter 13 bankruptcy, also known as "reorganization bankruptcy," allows individuals with regular income to create a repayment plan.\n\n*This article is for informational purposes only and does not constitute legal advice.*',
          publishedAt: '2024-01-15',
          status: 'published' as const,
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
          status: 'published' as const,
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
      ];
      
      // Save sample data to localStorage
      blogService.savePosts(sampleData);
      return sampleData;
    } catch (error) {
      console.error('Error in getAllPosts:', error);
      // Return empty array as fallback
      return [];
    }
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
