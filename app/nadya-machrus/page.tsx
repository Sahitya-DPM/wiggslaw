'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function NadyaMachrusPage() {
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
                  Nadya Machrus
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
                  Senior Attorney and Trust Administration Specialist
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Nadya Machrus brings extensive experience in trust administration, probate law, and estate planning to The Law Offices of Geoff Wiggs, providing compassionate and expert guidance to families during challenging times.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/about#nadya" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-wiggs-blue hover:bg-blue-700 transition-colors duration-300">
                    Learn More About Nadya
                  </a>
                  <a href="#contact-form" className="inline-flex items-center px-6 py-3 border border-wiggs-blue text-base font-medium rounded-md text-wiggs-blue bg-white hover:bg-blue-50 transition-colors duration-300">
                    Schedule Consultation
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <Image
                    src="/images/Nadya.webp"
                    alt="Nadya Machrus - Senior Attorney"
                    width={500}
                    height={600}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Nadya Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                  Dedicated to Trust Administration Excellence
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Nadya Machrus specializes in trust administration and probate law, helping families navigate the complex legal processes that follow the loss of a loved one. Her expertise ensures that estates are administered efficiently and in accordance with legal requirements.
                  </p>
                  <p>
                    With a deep understanding of California trust and probate law, Nadya provides comprehensive guidance to trustees, executors, and beneficiaries throughout the administration process. She is committed to making this challenging time as smooth as possible for families.
                  </p>
                  <p>
                    Nadya's practice also includes estate planning, where she helps individuals create comprehensive plans that protect their assets and ensure their wishes are carried out according to their intentions.
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <Image
                    src="/images/AdobeStock_251049533-2-scaled.webp"
                    alt="Trust Administration Excellence"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations Section */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Areas of Specialization
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nadya's focused expertise in trust administration and probate law provides clients with specialized knowledge and guidance in these critical areas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-wiggs-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Trust Administration</h3>
                <p className="text-gray-600 text-center">
                  Expert guidance through the complex process of trust administration, ensuring compliance with legal requirements and efficient asset distribution.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-wiggs-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Probate Law</h3>
                <p className="text-gray-600 text-center">
                  Comprehensive probate services including estate administration, creditor claims, and asset distribution in accordance with California law.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-wiggs-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Estate Planning</h3>
                <p className="text-gray-600 text-center">
                  Strategic estate planning to protect family assets and ensure wishes are carried out according to individual intentions and goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Nadya Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Nadya for Your Trust Administration Needs?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nadya's specialized expertise and compassionate approach make her the ideal choice for families navigating trust administration and probate matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-wiggs-blue rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Specialized Knowledge</h3>
                  <p className="text-gray-600">Deep expertise in California trust and probate law, ensuring accurate and efficient administration.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-wiggs-blue rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Compassionate Approach</h3>
                  <p className="text-gray-600">Understanding that families are dealing with loss, providing sensitive and supportive guidance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-wiggs-blue rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Efficient Process</h3>
                  <p className="text-gray-600">Streamlined administration processes that minimize delays and reduce stress for families.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-wiggs-blue rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Communication</h3>
                  <p className="text-gray-600">Regular updates and clear explanations of complex legal processes in understandable terms.</p>
                </div>
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
