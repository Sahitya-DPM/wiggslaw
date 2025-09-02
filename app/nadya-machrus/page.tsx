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
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", color: '#02adf0' }}>
                  Nadya Machrus,
                </h1>
                <p className="text-xl sm:text-2xl font-semibold mb-8" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", color: '#02adf0' }}>
                  Esq. Associate Attorney
                </p>
                <div className="space-y-4" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", lineHeight: '1.4', fontSize: '17px', color: 'rgb(0, 0, 0)', fontWeight: '500' }}>
                  <p>
                    Nadya Machrus is an Associate Attorney at the Law Offices of Geoff Wiggs. Nadya graduated from UC Berkeley in 2016 with a Bachelor of Arts degree in Legal Studies. She went on to earn her Juris Doctor in 2020 from Santa Clara University School of Law.
                  </p>
                  <p>
                    While in law school, Nadya was recognized on the Dean's list each year and graduated with a 3.8 grade point average (Top 10% = 3.814). Nadya also received CALI Excellence for the Future Awards for Appellate Advocacy, Constitutional Law II, and Criminal Procedure. The CALI Excellence award is given to the highest scoring student in the class.
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <Image
                    src="/images/Nadya-Headshot-1.webp"
                    alt="Nadya Machrus - Associate Attorney"
                    width={400}
                    height={600}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Full Width Content Section */}
            <div className="mt-12">
              <div className="space-y-4" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", lineHeight: '1.4', fontSize: '17px', color: 'rgb(0, 0, 0)', fontWeight: '500' }}>
                <p>
                  Prior to law school, Nadya worked as a legal assistant at an employment law firm and a legal assistant at a private investigator's office. During law school, she worked as an in-house legal intern for an industrial-focused memory modules and storage solutions manufacturer. During her second and third year of law school, Nadya joined the Law Offices of Geoff Wiggs as a legal intern and remained with the firm after passing the California Bar Exam on her first attempt.
                </p>
                <p>
                  At the Law Offices of Geoff Wiggs, her focuses and interests include Estate Planning, Trust Administration and Probate, Bankruptcy, and Civil Litigation.
                </p>
                <p>
                  Nadya currently holds memberships with the San Mateo County Bar Association, Consumer Attorneys of Los Angeles, and the Los Angeles County Bar Association.
                </p>
                <p>
                  She is currently licensed to practice in the Superior Courts of California and the United States District Court, Northern District of California.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

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
                <li><a href="/consumer-bankruptcy" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Consumer Bankruptcy</a></li>
                <li><a href="/estate-planning" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Estate Planning</a></li>
                <li><a href="#blog" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Blog</a></li>
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
    </div>
  )
}