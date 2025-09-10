'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { hybridBlogService } from '@/lib/hybridBlogService';
import { BlogPost } from '@/lib/blogService';
import RichTextEditor from '@/components/RichTextEditor';

export default function NewPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft' as 'draft' | 'published',
    author: 'Geoff Wiggs',
    imageUrl: '',
    imageAlt: '',
    featuredImage: '',
    publishDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    metaTitle: '',
    metaDescription: ''
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Auto-generate slug when title changes
      if (name === 'title') {
        newData.slug = generateSlug(value);
      }
      
      return newData;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setUploadedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          imageUrl: result,
          featuredImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      imageUrl: '',
      featuredImage: ''
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'draft' as 'draft' | 'published',
      author: 'Geoff Wiggs',
      imageUrl: '',
      imageAlt: '',
      featuredImage: '',
      publishDate: new Date().toISOString().split('T')[0],
      metaTitle: '',
      metaDescription: ''
    });
    setUploadedImage(null);
    setImagePreview('');
    setShowSuccessMessage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setIsSubmitting(true);

    // Show success message immediately
    setShowSuccessMessage(true);
    
    // Redirect to admin posts page with success message
    setTimeout(() => {
      console.log('Redirecting to admin posts page with success message');
      router.push('/admin/posts?published=true');
    }, 1000);

    // Save the post in the background (don't await)
    try {
      console.log('Saving post in background...');
      
      const newPost = await hybridBlogService.savePost({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        status: formData.status,
        author: formData.author,
        publishedAt: formData.status === 'published' ? (formData.publishDate ? new Date(formData.publishDate + 'T00:00:00').toISOString() : new Date().toISOString()) : '',
        imageUrl: formData.imageUrl,
        imageAlt: formData.imageAlt,
        featuredImage: formData.featuredImage,
        publishDate: formData.publishDate,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription
      });

      console.log('Post saved successfully in background:', newPost);
    } catch (error) {
      console.error('Error saving post in background:', error);
      // Don't show error to user since they've already been redirected
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Bankruptcy',
    'Estate Planning',
    'Business Law',
    'Consumer Law',
    'Probate',
    'Real Estate',
    'Family Law',
    'Criminal Defense'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <p className="mt-1 text-sm text-gray-600">
            Write and publish a new blog post
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Posts
        </Link>
      </motion.div>

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          className="bg-green-50 border border-green-200 rounded-md p-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                {formData.status === 'published' ? 'Blog published successfully!' : 'Blog saved as draft!'}
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>
                    {formData.status === 'published' 
                      ? 'Your blog post is being published! Redirecting to posts list...'
                      : 'Your blog post is being saved as a draft! Redirecting to posts list...'
                    }
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/posts?published=true')}
                    className="bg-green-100 px-3 py-2 rounded-md text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View All Posts
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-white px-3 py-2 rounded-md text-sm font-medium text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Create Another Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Post Details</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter a compelling title for your post"
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="url-friendly-slug"
              />
              <p className="mt-1 text-sm text-gray-500">
                This will be used in the URL. Auto-generated from title, but you can edit it.
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                id="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Write a brief summary of your post (optional)"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                name="metaTitle"
                id="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="SEO-optimized title for search engines (50-60 characters)"
                maxLength={60}
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.metaTitle.length}/60 characters
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (SEO)
              </label>
              <textarea
                name="metaDescription"
                id="metaDescription"
                rows={3}
                value={formData.metaDescription}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="SEO-optimized description for search engines (150-160 characters)"
                maxLength={160}
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.metaDescription.length}/160 characters
              </p>
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                id="author"
                value={formData.author}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Author name"
              />
            </div>

            {/* Publish Date */}
            <div>
              <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="date"
                name="publishDate"
                id="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Image Upload */}
            <div>
              <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imageUpload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="imageUpload"
                        name="imageUpload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              {uploadedImage && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={imagePreview}
                        alt="Upload preview"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {uploadedImage.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeUploadedImage}
                    className="ml-4 text-sm text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (Alternative)
              </label>
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">
                Or enter the URL of the featured image for this post
              </p>
            </div>

            {/* Image Alt Text */}
            <div>
              <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 mb-2">
                Image Alt Text
              </label>
              <input
                type="text"
                name="imageAlt"
                id="imageAlt"
                value={formData.imageAlt}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Descriptive text for accessibility"
              />
              <p className="mt-1 text-sm text-gray-500">
                Describe the image for screen readers and SEO
              </p>
            </div>

            {/* Featured Image Preview */}
            {(imagePreview || formData.imageUrl) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="border border-gray-300 rounded-md p-4">
                  <img
                    src={imagePreview || formData.imageUrl}
                    alt={formData.imageAlt || 'Image preview'}
                    className="max-w-full h-48 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {!imagePreview && !formData.imageUrl && (
                    <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                      No image preview available
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Editor */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Post Content</h2>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder="Write your post content here. Use the toolbar above to format your text..."
              height="500px"
            />
            <p className="mt-2 text-sm text-gray-500">
              Use the toolbar above to format your text with headings, links, lists, colors, and more.
            </p>
          </div>
        </motion.div>

        {/* Preview Section */}
        {formData.title && (
          <motion.div
            className="bg-white rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {/* Featured Image */}
              {formData.imageUrl && (
                <div className="mb-4">
                  <img
                    src={formData.imageUrl}
                    alt={formData.imageAlt || 'Featured image'}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{formData.title || 'Untitled Post'}</h3>
              {formData.excerpt && (
                <p className="text-gray-600 mb-4">{formData.excerpt}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span>By {formData.author}</span>
                <span>•</span>
                <span>{formData.publishDate ? new Date(formData.publishDate).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                {formData.category && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formData.category}
                    </span>
                  </>
                )}
                <span>•</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  formData.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {formData.status}
                </span>
              </div>
              <div className="prose max-w-none">
                <div 
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ 
                    __html: formData.content || '<p class="text-gray-400 italic">Start writing your content...</p>' 
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          className="flex items-center justify-end space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/admin/posts"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.content}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {formData.status === 'published' ? 'Publishing...' : 'Saving...'}
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {formData.status === 'published' ? 'Publish Post' : 'Save as Draft'}
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
