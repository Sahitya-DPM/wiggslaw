'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GeoffWiggsPage() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <Image
                  src="/images/wiggslaw logo.webp"
                  alt="Wiggs Law Logo"
                  width={200}
                  height={80}
                  className="h-12 w-auto sm:h-14 md:h-16 lg:h-18 object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
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
                <li><a href="#blog" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">BLOG</a></li>
                <li><a href="/contact-us" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">CONTACT US</a></li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            {isMounted && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wiggs-blue"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMounted && isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                  <Image
                    src="/images/wiggslaw logo.webp"
                    alt="Wiggs Law Logo"
                    width={200}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-6">
                  <ul className="space-y-4">
                    <li><a href="/" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">HOME</a></li>
                    <li><a href="/about" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">ABOUT</a></li>
                    <li><a href="/consumer-bankruptcy" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">Consumer Bankruptcy</a></li>
                    <li><a href="/estate-planning" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">Estate Planning</a></li>
                    <li><a href="/probate-administration" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">Probate and Trust Administration</a></li>
                    <li><a href="/business-entity-formation" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">Business and Entity Formation</a></li>
                    <li><a href="#blog" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">BLOG</a></li>
                    <li><a href="/contact-us" className="block text-lg text-gray-700 hover:text-wiggs-blue transition-colors duration-300">CONTACT US</a></li>
                  </ul>
                </nav>

                {/* Contact Info */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Law Offices of Geoff Wiggs</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>1900 S. Norfolk Street, Suite 350</p>
                    <p>San Mateo, California 94403</p>
                    <p>(650) 577-5952</p>
                    <p>(650) 577-5953</p>
                    <p>information@wiggslaw.com</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Geoff Wiggs
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
                  Founding Attorney and Principal of The Law Offices of Geoff Wiggs
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  With over two decades of experience in bankruptcy law and estate planning, Geoff Wiggs has dedicated his career to helping individuals and families navigate complex legal challenges with compassion and expertise.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/about#geoff" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-wiggs-blue hover:bg-blue-700 transition-colors duration-300">
                    Learn More About Geoff
                  </a>
                  <a href="#contact-form" className="inline-flex items-center px-6 py-3 border border-wiggs-blue text-base font-medium rounded-md text-wiggs-blue bg-white hover:bg-blue-50 transition-colors duration-300">
                    Schedule Consultation
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <Image
                    src="/images/Geoffrey.webp"
                    alt="Geoff Wiggs - Founding Attorney"
                    width={500}
                    height={600}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Geoff Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                  A Legacy of Legal Excellence
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Geoff Wiggs founded The Law Offices of Geoff Wiggs with a clear mission: to provide accessible, high-quality legal services to individuals and families facing financial and estate planning challenges.
                  </p>
                  <p>
                    His practice focuses on consumer bankruptcy, helping individuals regain financial stability through Chapter 7 and Chapter 13 bankruptcy proceedings. Geoff understands that financial difficulties can affect every aspect of life, and he approaches each case with empathy and determination.
                  </p>
                  <p>
                    In addition to bankruptcy law, Geoff is an experienced estate planning attorney who helps families protect their assets and ensure their wishes are carried out through comprehensive estate planning strategies.
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <Image
                    src="/images/AdobeStock_251049533-2-scaled.webp"
                    alt="Legal Excellence"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Expertise Section */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Experience & Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Geoff's extensive experience spans multiple areas of law, providing comprehensive solutions for his clients' diverse legal needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-wiggs-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Consumer Bankruptcy</h3>
                <p className="text-gray-600 text-center">
                  Specialized expertise in Chapter 7 and Chapter 13 bankruptcy proceedings, helping clients achieve financial fresh starts.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-wiggs-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Estate Planning</h3>
                <p className="text-gray-600 text-center">
                  Comprehensive estate planning including wills, trusts, and advance directives to protect family assets and wishes.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-wiggs-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Business Formation</h3>
                <p className="text-gray-600 text-center">
                  Expert guidance in forming and structuring business entities to protect personal assets and optimize business operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 sm:py-24 bg-wiggs-blue">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                The Law Offices of Geoff Wiggs is ready to help. Contact us today to start your FREE consultation.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <iframe
                src="https://form.jotform.com/240106235636145"
                width="100%"
                height="600"
                style={{ border: 'none' }}
                title="Contact Form"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Image
                src="/images/wiggslaw logo.webp"
                alt="Wiggs Law Logo"
                width={200}
                height={80}
                className="h-16 w-auto object-contain mb-4"
              />
              <p className="text-gray-300 text-sm">
                Providing expert legal counsel with compassion and dedication.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/consumer-bankruptcy" className="hover:text-white transition-colors">Consumer Bankruptcy</a></li>
                <li><a href="/estate-planning" className="hover:text-white transition-colors">Estate Planning</a></li>
                <li><a href="/probate-administration" className="hover:text-white transition-colors">Probate Administration</a></li>
                <li><a href="/business-entity-formation" className="hover:text-white transition-colors">Business Formation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>1900 S. Norfolk Street, Suite 350</p>
                <p>San Mateo, California 94403</p>
                <p>Phone: (650) 577-5952</p>
                <p>Fax: (650) 577-5953</p>
                <p>Email: information@wiggslaw.com</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact-us" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} The Law Offices of Geoff Wiggs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
