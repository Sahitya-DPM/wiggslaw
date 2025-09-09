'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { blogService, BlogPost } from '@/lib/blogService';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = () => {
      try {
        const foundPost = blogService.getPostById(postId);
        if (foundPost && foundPost.status === 'published') {
          setPost(foundPost);
          // Increment view count
          blogService.incrementViews(postId);
        } else {
          // Post not found or not published, redirect to blog
          router.push('/blog');
          return;
        }
      } catch (error) {
        console.error('Error loading post:', error);
        router.push('/blog');
        return;
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist or isn't published.</p>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/images/wiggslaw logo.webp"
                alt="Wiggs Law Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <h1 className="ml-4 text-2xl font-bold text-gray-900">Legal Blog</h1>
            </div>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Blog Post */}
      <motion.article 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {post.imageUrl && (
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                width={800}
                height={450}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{new Date(post.publishDate || post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.views} views</span>
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-lg text-gray-600 mb-8 font-medium">
                {post.excerpt}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-gray-600">
                    Legal expert at Wiggs Law specializing in {post.category.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
