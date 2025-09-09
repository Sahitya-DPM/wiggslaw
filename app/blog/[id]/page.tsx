'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { hybridBlogService } from '@/lib/hybridBlogService';
import { BlogPost } from '@/lib/blogService';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const foundPost = await hybridBlogService.getPostById(postId);
        if (foundPost && foundPost.status === 'published') {
          setPost(foundPost);
          // Increment view count
          hybridBlogService.incrementViews(postId);
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">HOME</a>
                  <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">ABOUT</a>
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-base font-medium text-gray-700">SERVICES</div>
                    <a href="/consumer-bankruptcy" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Consumer Bankruptcy</a>
                    <a href="/estate-planning" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Estate Planning</a>
                    <a href="/probate-administration" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Probate and Trust Administration</a>
                    <a href="/business-entity-formation" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Business and Entity Formation</a>
                  </div>
                  <a href="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">BLOG</a>
                  <a href="/contact-us" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">CONTACT US</a>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">HOME</a>
                  <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">ABOUT</a>
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-base font-medium text-gray-700">SERVICES</div>
                    <a href="/consumer-bankruptcy" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Consumer Bankruptcy</a>
                    <a href="/estate-planning" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Estate Planning</a>
                    <a href="/probate-administration" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Probate and Trust Administration</a>
                    <a href="/business-entity-formation" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Business and Entity Formation</a>
                  </div>
                  <a href="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">BLOG</a>
                  <a href="/contact-us" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">CONTACT US</a>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Back to Blog
            </Link>
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">HOME</a>
                <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">ABOUT</a>
                <div className="space-y-1">
                  <div className="px-3 py-2 text-base font-medium text-gray-700">SERVICES</div>
                  <a href="/consumer-bankruptcy" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Consumer Bankruptcy</a>
                  <a href="/estate-planning" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Estate Planning</a>
                  <a href="/probate-administration" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Probate and Trust Administration</a>
                  <a href="/business-entity-formation" className="block px-6 py-2 text-sm text-gray-600 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">Business and Entity Formation</a>
                </div>
                <a href="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">BLOG</a>
                <a href="/contact-us" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wiggs-blue hover:bg-gray-50 rounded-md">CONTACT US</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                width={800}
                height={450}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Post Meta */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{new Date(post.publishDate || post.publishedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {post.category}
              </span>
            </div>

            {/* Post Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Post Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </motion.div>

        {/* Back to Blog Link */}
        <div className="mt-8 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
                <li><a href="/consumer-bankruptcy" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Consumer Bankruptcy</a></li>
                <li><a href="/estate-planning" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Estate Planning</a></li>
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