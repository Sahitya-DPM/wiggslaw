'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { hybridBlogService } from '@/lib/hybridBlogService';
import { BlogPost } from '@/lib/blogService';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await hybridBlogService.getAllPosts();
        // Only show published posts
        const publishedPosts = allPosts.filter(post => post.status === 'published');
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Check for success message parameter
  useEffect(() => {
    const published = searchParams.get('published');
    if (published === 'true') {
      setShowSuccessMessage(true);
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  }, [searchParams]);

  const filteredPosts = posts;

  if (isLoading) {
    return (
      <main className="min-h-screen">
        {/* Header Section */}
        <section id="header" className="w-full bg-white shadow-header sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/">
                  <Image
                    src="/images/wiggslaw logo.webp"
                    alt="Wiggs Law Logo"
                    width={350}
                    height={80}
                    className="h-12 w-auto sm:h-14 md:h-16 lg:h-18 object-contain"
                  />
                </a>
              </div>

              {/* Desktop Navigation Menu */}
              <ul className="hidden md:flex space-x-8">
                <li><a href="/" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">HOME</a></li>
                <li><a href="/about" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">ABOUT</a></li>
                <li className="relative">
                  <button 
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide flex items-center text-xl"
                  >
                    SERVICES
                    <svg className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                      <a href="/consumer-bankruptcy" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Consumer Bankruptcy</a>
                      <a href="/estate-planning" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Estate Planning</a>
                      <a href="/probate-administration" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Probate and Trust Administration</a>
                      <a href="/business-entity-formation" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Business and Entity Formation</a>
                    </div>
                  )}
                </li>
                <li><a href="/blog" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">BLOG</a></li>
                <li><a href="/contact-us" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">CONTACT US</a></li>
              </ul>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-wiggs-blue hover:bg-gray-100 transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              
              {/* Menu Panel */}
              <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
                {/* Logo and Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/wiggslaw logo.webp"
                      alt="Wiggs Law Logo"
                      width={200}
                      height={50}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-600 hover:text-wiggs-blue hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Menu Items */}
                <div className="p-6 border-b border-gray-200">
                  <ul className="space-y-4">
                    <li><a href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">HOME</a></li>
                    <li><a href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">ABOUT</a></li>
                    <li>
                      <button 
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="w-full text-left px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide flex items-center justify-between rounded-lg hover:bg-gray-50"
                      >
                        SERVICES
                        <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isServicesOpen && (
                        <ul className="ml-4 mt-3 space-y-2">
                          <li><a href="/consumer-bankruptcy" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Consumer Bankruptcy</a></li>
                          <li><a href="/estate-planning" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Estate Planning</a></li>
                          <li><a href="/probate-administration" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Probate and Trust Administration</a></li>
                          <li><a href="/business-entity-formation" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Business and Entity Formation</a></li>
                        </ul>
                      )}
                    </li>
                    <li><a href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">BLOG</a></li>
                    <li><a href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">CONTACT US</a></li>
                  </ul>
                </div>
                
                {/* Contact Information */}
                <div className="p-6">
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-semibold text-gray-900">Law Offices of Geoff Wiggs</p>
                    <p>1900 S. Norfolk Street, Suite 350</p>
                    <p>San Mateo, California 94403</p>
                    <p className="pt-2">Phone: (650) 577-5952</p>
                    <p>Email: information@wiggslaw.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section id="header" className="w-full bg-white shadow-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <Image
                  src="/images/wiggslaw logo.webp"
                  alt="Wiggs Law Logo"
                  width={350}
                  height={80}
                  className="h-12 w-auto sm:h-14 md:h-16 lg:h-18 object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation Menu */}
            <ul className="hidden md:flex space-x-8">
              <li><a href="/" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">HOME</a></li>
              <li><a href="/about" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">ABOUT</a></li>
              <li className="relative">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide flex items-center text-xl"
                >
                  SERVICES
                  <svg className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                    <a href="/consumer-bankruptcy" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Consumer Bankruptcy</a>
                    <a href="/estate-planning" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Estate Planning</a>
                    <a href="/probate-administration" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Probate and Trust Administration</a>
                    <a href="/business-entity-formation" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300">Business and Entity Formation</a>
                  </div>
                )}
              </li>
              <li><a href="/blog" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">BLOG</a></li>
              <li><a href="/contact-us" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">CONTACT US</a></li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-wiggs-blue hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Menu Panel */}
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
              {/* Logo and Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/wiggslaw logo.webp"
                    alt="Wiggs Law Logo"
                    width={200}
                    height={50}
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-wiggs-blue hover:bg-gray-100 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="p-6 border-b border-gray-200">
                <ul className="space-y-4">
                  <li><a href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">HOME</a></li>
                  <li><a href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">ABOUT</a></li>
                  <li>
                    <button 
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="w-full text-left px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide flex items-center justify-between rounded-lg hover:bg-gray-50"
                    >
                      SERVICES
                      <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isServicesOpen && (
                      <ul className="ml-4 mt-3 space-y-2">
                        <li><a href="/consumer-bankruptcy" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Consumer Bankruptcy</a></li>
                        <li><a href="/estate-planning" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Estate Planning</a></li>
                        <li><a href="/probate-administration" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Probate and Trust Administration</a></li>
                        <li><a href="/business-entity-formation" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-wiggs-blue transition-colors duration-300 rounded-lg">Business and Entity Formation</a></li>
                      </ul>
                    )}
                  </li>
                  <li><a href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">BLOG</a></li>
                  <li><a href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">CONTACT US</a></li>
                </ul>
              </div>
              
              {/* Contact Information */}
              <div className="p-6">
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-900">Law Offices of Geoff Wiggs</p>
                  <p>1900 S. Norfolk Street, Suite 350</p>
                  <p>San Mateo, California 94403</p>
                  <p className="pt-2">Phone: (650) 577-5952</p>
                  <p>Email: information@wiggslaw.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          className="bg-green-50 border-l-4 border-green-400 p-4 mx-4 sm:mx-6 lg:mx-8 mb-6"
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
              <p className="text-sm text-green-700">
                <strong>Blog post published!</strong> Your new blog post is being processed and will be visible shortly.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setShowSuccessMessage(false)}
                  className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Posts */}
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Check back later for new posts.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white border border-gray-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="cursor-pointer">
                    {/* Featured Image */}
                    {post.imageUrl && (
                      <div className="aspect-w-16 aspect-h-9">
                        <Image
                          src={post.imageUrl}
                          alt={post.imageAlt || post.title}
                          width={400}
                          height={225}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Category */}
                      <div className="mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 
                        className="mb-2 line-clamp-2"
                        style={{
                          fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                          fontWeight: 700,
                          color: '#02adf0',
                          fontSize: '30px',
                          lineHeight: '1em'
                        }}
                      >
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p 
                        className="mb-4 line-clamp-3"
                        style={{
                          fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                          fontSize: '18px',
                          color: '#000000',
                          lineHeight: '1.7em'
                        }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between">
                        <div 
                          className="flex items-center space-x-2"
                          style={{
                            fontFamily: 'Open Sans, Arial, sans-serif',
                            fontSize: '14px',
                            color: '#666',
                            backgroundColor: '#fff',
                            lineHeight: '1.7em',
                            fontWeight: 500
                          }}
                        >
                          <span>By {post.author}</span>
                          <span>•</span>
                          <span>{new Date(post.publishDate || post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span 
                            style={{
                              fontFamily: 'Open Sans, Arial, sans-serif',
                              fontSize: '14px',
                              color: '#666',
                              backgroundColor: '#fff',
                              lineHeight: '1.7em',
                              fontWeight: 500
                            }}
                          >
                            {post.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </motion.main>


      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-lg p-6">
            <iframe
              src="https://link.digitalpresencematters.com/widget/form/ZsaLaKI6nCZj8uLRYFxU"
              style={{width:'100%',height:'625px',border:'none',borderRadius:'5px'}}
              id="inline-ZsaLaKI6nCZj8uLRYFxU" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Wiggslaw new website all pages common form"
              data-height="625"
              data-layout-iframe-id="inline-ZsaLaKI6nCZj8uLRYFxU"
              data-form-id="ZsaLaKI6nCZj8uLRYFxU"
              title="Wiggslaw new website all pages common form"
            >
            </iframe>
            <script src="https://link.digitalpresencematters.com/js/form_embed.js"></script>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 - Logo and Description */}
            <div>
              <div className="mb-4">
                <a href="/">
                  <Image
                    src="/images/wiggslaw logo.webp"
                    alt="Wiggs Law Logo"
                    width={200}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </a>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                The Law Offices of Geoff Wiggs handles cases in the areas of Estate Planning, Trust and Estate Administration, Probate and Bankruptcy. Located in San Mateo, the Law Offices of Geoff Wiggs represents clients throughout the Bay Area, and across California, Montana and Wyoming.
              </p>
            </div>

            {/* Column 2 - Recent News */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#02adf0' }}>Recent News</h3>
              <div className="text-gray-600 space-y-2">
                <p className="text-sm">Stay updated with the latest legal insights and firm news.</p>
                <p className="text-sm">Coming soon...</p>
              </div>
            </div>

            {/* Column 3 - Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#02adf0' }}>Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Home</a></li>
                <li><a href="/about" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>About</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Consumer Bankruptcy</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Estate Planning</a></li>
                <li><a href="/blog" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Blog</a></li>
                <li><a href="/contact-us" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4 - Contact Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#02adf0' }}>Contact Us</h3>
              <div className="text-gray-600 space-y-3">
                <div>
                  <p className="font-semibold">Law Offices of Geoff Wiggs</p>
                  <p className="text-sm">1900 S. Norfolk Street, Suite 350</p>
                  <p className="text-sm">San Mateo, California 94403</p>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p className="text-sm">(650) 577-5952</p>
                  <p className="text-sm">(650) 577-5953</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p className="text-sm">information@wiggslaw.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
