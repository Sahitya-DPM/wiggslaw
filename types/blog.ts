export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  coverImageUrl?: string;
  tags: string[];
  categories: string[];
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  published: boolean;
  author: string;
  readTime: number;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: File;
  coverImageUrl?: string;
  tags: string;
  categories: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  published: boolean;
  author: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

