'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ContactUs() {
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
          {isMounted && (
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
                    <div className="pt-2">
                      <p>(650) 577-5952</p>
                      <p>(650) 577-5953</p>
                    </div>
                    <div className="pt-1">
                      <p>information@wiggslaw.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

             {/* Contact Form Section */}
       <section className="py-16 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             {/* Contact Information */}
             <div>
               <h2
                 className="text-3xl font-bold mb-6"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 Get In Touch
               </h2>
               <p className="text-gray-600 mb-8">
                 We're here to help you navigate your legal challenges. Contact us today for a free consultation.
               </p>
               
               <div className="space-y-6">
                 <div className="flex items-start space-x-4">
                   <div className="flex-shrink-0">
                     <div className="w-10 h-10 bg-wiggs-blue rounded-full flex items-center justify-center">
                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                     </div>
                   </div>
                   <div>
                     <h3 className="font-semibold text-gray-900">Office Location</h3>
                     <p className="text-gray-600">1900 S. Norfolk Street, Suite 350<br />San Mateo, California 94403</p>
                   </div>
                 </div>

                 <div className="flex items-start space-x-4">
                   <div className="flex-shrink-0">
                     <div className="w-10 h-10 bg-wiggs-blue rounded-full flex items-center justify-center">
                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                     </div>
                   </div>
                   <div>
                     <h3 className="font-semibold text-gray-900">Phone</h3>
                     <p className="text-gray-600">(650) 577-5952<br />(650) 577-5953</p>
                   </div>
                 </div>

                 <div className="flex items-start space-x-4">
                   <div className="flex-shrink-0">
                     <div className="w-10 h-10 bg-wiggs-blue rounded-full flex items-center justify-center">
                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                     </div>
                   </div>
                   <div>
                     <h3 className="font-semibold text-gray-900">Email</h3>
                     <p className="text-gray-600">information@wiggslaw.com</p>
                   </div>
                 </div>

                 <div className="flex items-start space-x-4">
                   <div className="flex-shrink-0">
                     <div className="w-10 h-10 bg-wiggs-blue rounded-full flex items-center justify-center">
                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                     </div>
                   </div>
                   <div>
                     <h3 className="font-semibold text-gray-900">Office Hours</h3>
                     <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: By Appointment<br />Sunday: Closed</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Contact Form */}
             <div>
               <h2
                 className="text-3xl font-bold mb-6"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 Send Us a Message
               </h2>
               <p className="text-gray-600 mb-6 text-lg">
                 Ready to get started? The Law Offices of Geoff Wiggs is ready to help. Contact us today to start your FREE consultation.
               </p>
               <div className="w-full" id="contact-form">
                 <iframe
                   src="https://link.digitalpresencematters.com/widget/form/QcbUnaEJTxJA2KqYOM1v"
                   style={{width:'100%',height:'529px',border:'none',borderRadius:'0px'}}
                   id="inline-QcbUnaEJTxJA2KqYOM1v" 
                   data-layout="{'id':'INLINE'}"
                   data-trigger-type="alwaysShow"
                   data-trigger-value=""
                   data-activation-type="alwaysActivated"
                   data-activation-value=""
                   data-deactivation-type="neverDeactivate"
                   data-deactivation-value=""
                   data-form-name="Wiggslaw new website contact us page form"
                   data-height="529"
                   data-layout-iframe-id="inline-QcbUnaEJTxJA2KqYOM1v"
                   data-form-id="QcbUnaEJTxJA2KqYOM1v"
                   title="Wiggslaw new website contact us page form"
                 >
                 </iframe>
                 <script src="https://link.digitalpresencematters.com/js/form_embed.js"></script>
               </div>
             </div>
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
    </div>
  );
}
