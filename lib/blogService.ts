export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  status: 'published' | 'draft';
  views: number;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  imageAlt?: string;
  featuredImage?: string;
  publishDate?: string;
  metaTitle?: string;
  metaDescription?: string;
}

const STORAGE_KEY = 'wiggslaw_blog_posts';

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Initialize with sample data if no posts exist
const initializeSampleData = (): BlogPost[] => [
  {
    id: '1',
    title: 'Understanding Bankruptcy Law: A Complete Guide',
    slug: 'understanding-bankruptcy-law-complete-guide',
    excerpt: 'Learn about the different types of bankruptcy and how they can help you get back on track financially.',
    metaTitle: 'Bankruptcy Law Guide - Complete Guide to Bankruptcy Types & Process',
    metaDescription: 'Comprehensive guide to bankruptcy law, including Chapter 7, Chapter 13, and Chapter 11 bankruptcy. Learn about the bankruptcy process, requirements, and how to get back on track financially.',
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

## What Debts Can Be Discharged?

Most unsecured debts can be discharged in bankruptcy, including:
- Credit card debt
- Medical bills
- Personal loans
- Utility bills
- Some tax debts

## What Debts Cannot Be Discharged?

Certain debts cannot be discharged, including:
- Student loans (in most cases)
- Child support and alimony
- Recent tax debts
- Debts from fraud or criminal activity

## Getting Help

If you're considering bankruptcy, it's important to consult with an experienced bankruptcy attorney who can:
- Evaluate your financial situation
- Determine which type of bankruptcy is right for you
- Guide you through the process
- Protect your rights and interests

## Conclusion

Bankruptcy is not a failure, but rather a legal tool designed to help individuals and families get back on their feet financially. With proper guidance and understanding, it can provide the fresh start you need to rebuild your financial future.

*This article is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for advice specific to your situation.*`,
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
    metaTitle: 'Estate Planning Guide - Protect Your Family\'s Future with Proper Planning',
    metaDescription: 'Learn essential estate planning strategies to protect your family\'s future. Get expert advice on wills, trusts, and asset protection from experienced estate planning attorneys.',
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

### 3. Power of Attorney
A power of attorney allows someone you trust to make financial decisions on your behalf if you become unable to do so.

### 4. Healthcare Directive
Also known as a living will, this document specifies your wishes regarding medical treatment if you become unable to communicate.

## Benefits of Estate Planning

- **Protect Your Family**: Ensure your loved ones are provided for
- **Avoid Probate**: Reduce costs and delays for your beneficiaries
- **Minimize Taxes**: Take advantage of tax-saving strategies
- **Maintain Control**: Decide how and when your assets are distributed
- **Peace of Mind**: Know that your wishes will be carried out

## Common Estate Planning Mistakes

1. **Not Having a Plan**: Many people put off estate planning
2. **Not Updating Documents**: Life changes require plan updates
3. **Not Considering Taxes**: Proper planning can minimize tax burden
4. **Not Planning for Incapacity**: Consider what happens if you can't make decisions
5. **Not Communicating**: Let your family know about your plans

## Getting Started

Estate planning doesn't have to be complicated. Start by:
1. Taking inventory of your assets
2. Identifying your goals
3. Consulting with an estate planning attorney
4. Creating the necessary documents
5. Reviewing and updating regularly

## Conclusion

Estate planning is a gift you give to your family. By taking the time to plan now, you can ensure that your wishes are carried out and your loved ones are protected.

*This article is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for advice specific to your situation.*`,
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
  },
  {
    id: '3',
    title: 'Business Entity Formation: LLC vs Corporation',
    slug: 'business-entity-formation-llc-vs-corporation',
    excerpt: 'Choosing the right business structure for your new venture.',
    metaTitle: 'Business Entity Formation - LLC vs Corporation Guide for Entrepreneurs',
    metaDescription: 'Compare LLC vs Corporation for your business. Learn about business entity formation, legal requirements, tax implications, and which structure is best for your startup.',
    content: `# Business Entity Formation: LLC vs Corporation

Choosing the right business structure is one of the most important decisions you'll make when starting a business.

## Types of Business Entities

### Sole Proprietorship
- Simplest form of business
- No separate legal entity
- Owner has unlimited personal liability
- Easy to set up and maintain

### Partnership
- Two or more owners
- Shared profits and losses
- General partnership: unlimited liability
- Limited partnership: limited liability for some partners

### Limited Liability Company (LLC)
- Hybrid structure combining corporation and partnership benefits
- Limited personal liability
- Flexible management structure
- Pass-through taxation

### Corporation
- Separate legal entity
- Limited personal liability
- More complex structure
- Double taxation (unless S-Corp election)

## LLC vs Corporation: Key Differences

### Liability Protection
Both LLCs and corporations provide limited liability protection, meaning owners are generally not personally responsible for business debts.

### Taxation
- **LLC**: Pass-through taxation (profits/losses flow to owners)
- **Corporation**: Double taxation (corporate level + shareholder level)
- **S-Corporation**: Pass-through taxation with restrictions

### Management
- **LLC**: Flexible management (member-managed or manager-managed)
- **Corporation**: Structured management (board of directors, officers)

### Formalities
- **LLC**: Fewer formalities, more flexibility
- **Corporation**: More formalities, required meetings, record-keeping

## Choosing the Right Structure

Consider these factors:
- **Liability Protection**: How much personal liability protection do you need?
- **Tax Implications**: What are the tax consequences of each structure?
- **Management Style**: How do you want to run the business?
- **Growth Plans**: Do you plan to raise capital or go public?
- **Formalities**: How much administrative work are you willing to do?

## Steps to Form Your Business

1. **Choose Your Structure**: Decide between LLC, corporation, etc.
2. **Choose a Name**: Ensure it's available and complies with state law
3. **File Formation Documents**: Articles of incorporation or organization
4. **Obtain EIN**: Get a federal tax identification number
5. **Create Operating Agreement**: Define how the business will operate
6. **Comply with State Requirements**: Register with state agencies
7. **Obtain Licenses**: Get necessary business licenses

## Common Mistakes to Avoid

- Not considering tax implications
- Choosing the wrong structure for your goals
- Not properly maintaining corporate formalities
- Not having proper operating agreements
- Not understanding ongoing compliance requirements

## Getting Professional Help

Business formation can be complex. Consider consulting with:
- Business attorney
- Accountant
- Business consultant
- State business development office

## Conclusion

The right business structure depends on your specific goals, circumstances, and plans for growth. Take the time to understand your options and consult with professionals to make the best choice for your business.

*This article is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for advice specific to your situation.*`,
    publishedAt: '2024-01-05',
    status: 'draft',
    views: 0,
    author: 'Geoff Wiggs',
    category: 'Business Law',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
    imageUrl: '/images/AdobeStock_353595333-scaled.webp',
    imageAlt: 'Business formation consultation',
    featuredImage: '/images/AdobeStock_353595333-scaled.webp',
    publishDate: '2024-01-05'
  }
];

export const blogService = {
  // Get all posts
  getAllPosts(): BlogPost[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with sample data
      this.savePosts(initializeSampleData());
      return initializeSampleData();
    }
    
    try {
      const posts = JSON.parse(stored);
      
      // Migrate existing posts to have slugs if they don't
      const migratedPosts = posts.map((post: any) => {
        if (!post.slug) {
          return {
            ...post,
            slug: generateSlug(post.title)
          };
        }
        return post;
      });
      
      // Save migrated posts if any were updated
      if (migratedPosts.some((post: any, index: number) => !posts[index].slug)) {
        this.savePosts(migratedPosts);
      }
      
      return migratedPosts;
    } catch (error) {
      console.error('Error parsing stored posts:', error);
      return initializeSampleData();
    }
  },

  // Get a single post by ID
  getPostById(id: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find(post => post.id === id) || null;
  },

  // Get a single post by slug
  getPostBySlug(slug: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  },

  // Save a new post
  savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'>): BlogPost {
    const posts = this.getAllPosts();
    const newPost: BlogPost = {
      ...post,
      slug: generateSlug(post.title),
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0
    };
    
    posts.unshift(newPost); // Add to beginning
    this.savePosts(posts);
    return newPost;
  },

  // Update an existing post
  updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'views'>>): BlogPost | null {
    const posts = this.getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) return null;
    
    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.savePosts(posts);
    return posts[index];
  },

  // Delete a post
  deletePost(id: string): boolean {
    const posts = this.getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) return false; // Post not found
    
    this.savePosts(filteredPosts);
    return true;
  },

  // Increment view count
  incrementViews(id: string): void {
    const posts = this.getAllPosts();
    const post = posts.find(p => p.id === id);
    if (post) {
      post.views += 1;
      this.savePosts(posts);
    }
  },

  // Save posts to localStorage
  savePosts(posts: BlogPost[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  },

  // Get posts by status
  getPostsByStatus(status: 'published' | 'draft'): BlogPost[] {
    return this.getAllPosts().filter(post => post.status === status);
  },

  // Search posts
  searchPosts(query: string): BlogPost[] {
    const posts = this.getAllPosts();
    const lowercaseQuery = query.toLowerCase();
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.author.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    );
  }
};
