'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const slideReviews = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentReviewIndex((prev) => (prev + 1) % 3)
    } else {
      setCurrentReviewIndex((prev) => (prev - 1 + 3) % 3)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentReviewIndex(index)
  }

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
              <li><a href="#blog" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">BLOG</a></li>
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
                    <li><a href="#blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">BLOG</a></li>
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

      {/* About Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
            {/* First Column - Image */}
            <div className="lg:col-span-1">
              <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                <Image
                  src="/images/Geoffrey.webp"
                  alt="Geoffrey E. Wiggs, Esq."
                  width={400}
                  height={600}
                  className="w-full h-full rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Second Column - Text (Wider) */}
            <div className="lg:col-span-2">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", color: '#02adf0' }}>
                    Geoffrey E. Wiggs
                  </h1>
                  <p className="text-lg sm:text-xl font-semibold" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", color: '#02adf0' }}>
                    Esq. Principal
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base md:text-[17px]" style={{ 
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}>
                    Geoff Wiggs is a 3rd career attorney. In addition to his Juris Doctor (JD), his background includes service in the United States Air Force, a bachelor's degree in Computer Science and a Master's in Business Administration (MBA).
                  </p>

                  <p className="text-sm sm:text-base md:text-[17px]" style={{ 
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}>
                    While in law school, Geoff concentrated in the areas of Consumer, Bankruptcy and Start-Up Law.
                  </p>

                  <p className="text-sm sm:text-base md:text-[17px]" style={{ 
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}>
                    While in law school he volunteered as a clerk for the Northern California Bankruptcy Court and served as Online Managing Editor for the Santa Clara High Technology Law Journal.
                  </p>

                  <p className="text-sm sm:text-base md:text-[17px]" style={{ 
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}>
                    He graduated in 2009 and opened his practice immediately after passing the bar. Today, his practice is focused on probate, bankruptcy, consumer law, and general civil litigation.
                  </p>
                </div>

                <div className="pt-2 sm:pt-4">
                  <a 
                    href="#more-about" 
                    className="hover:text-gray-700 underline text-sm sm:text-base md:text-[17px]"
                    style={{
                      fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                      color: '#000000',
                      fontWeight: '500'
                    }}
                  >
                    More about Geoff Wiggs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nadya Machrus Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
            {/* First Column - Text (Wider) */}
            <div className="lg:col-span-2">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", color: '#02adf0' }}>
                    Nadya Machrus
                  </h2>
                  <p className="text-lg sm:text-xl font-semibold" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", color: '#02adf0' }}>
                    Esq. Associate Attorney
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base md:text-[17px]" style={{ 
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}>
                    Nadya Machrus is an Associate Attorney at the Law Offices of Geoff Wiggs. Nadya graduated from UC Berkeley in 2016 with a Bachelor of Arts degree in Legal Studies. She went on to earn her Juris Doctor in 2020 from Santa Clara University School of Law.
                  </p>

                  <p className="text-sm sm:text-base md:text-[17px]" style={{ 
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}>
                    While in law school, Nadya was recognized on the Dean's list each year and graduated with a 3.8 grade point average (Top 10% = 3.814). Nadya also received CALI Excellence for the Future Awards for Appellate Advocacy, Constitutional Law II, and Criminal Procedure. The CALI Excellence award is given to the highest scoring student in the class.
                  </p>
                </div>

                <div className="pt-2 sm:pt-4">
                  <a 
                    href="#more-about-nadya" 
                    className="hover:text-gray-700 underline text-sm sm:text-base md:text-[17px]"
                    style={{
                      fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                      color: '#000000',
                      fontWeight: '500'
                    }}
                  >
                    More about Nadya Machrus
                  </a>
                </div>
              </div>
            </div>

            {/* Second Column - Image */}
            <div className="lg:col-span-1.5">
              <div className="relative min-h-[600px]">
                <Image
                  src="/images/Nadya-Headshot-1.webp"
                  alt="Nadya Machrus, Esq."
                  width={400}
                  height={600}
                  className="w-full h-full rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yelp Reviews Section */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 w-full"
        style={{
          backgroundColor: '#eeeeee',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      >
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{
            fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
            color: '#02adf0'
          }}
        >
          Yelp Reviews
        </h2>

        <div className="relative w-full">
          {/* Review Slider Container */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out w-full"
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              {/* Review 1 */}
              <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-card p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-gray-700 mb-4 leading-relaxed italic"
                    style={{
                      fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                      fontSize: '16px'
                    }}
                  >
                    "A++++ all the way. Nadya Machrus was just the best in helping me with my bankruptcy case. She put me at ease and helped me thru the entire process and made it as stress free as possible. Very knowledgeable and understanding. Super efficient and excellent communication. Highly recommend working with her for all your bankruptcy needs."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold" style={{ color: '#02adf0' }}>Lisa M.</div>
                    <div className="text-sm text-gray-500">5/04/2022</div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-card p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-gray-700 mb-4 leading-relaxed italic"
                    style={{
                      fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                      fontSize: '16px'
                    }}
                  >
                    "Was looking for an attorney to answer question about probate and trust filings. Geoff was understanding and compassionate with me in my time of grief. He answered my questions and helped me to move forward to deal with all the paperwork needed."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold" style={{ color: '#02adf0' }}>Cathy S.</div>
                    <div className="text-sm text-gray-500">4/14/2022</div>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-card p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-gray-700 mb-4 leading-relaxed italic"
                    style={{
                      fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                      fontSize: '16px'
                    }}
                  >
                    "Mr. Wiggs and his staff are beyond amazing! I highly recommend his office as they are all very professional and very organized. They made this whole process very easy and they are all very helpful. They will answer any questions or concerns you may have."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold" style={{ color: '#02adf0' }}>Nerilyn C.</div>
                    <div className="text-sm text-gray-500">1/06/2022</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-300 z-10"
            onClick={() => slideReviews('prev')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#02adf0' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-300 z-10"
            onClick={() => slideReviews('next')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#02adf0' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentReviewIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                style={{
                  backgroundColor: index === currentReviewIndex ? '#02adf0' : '#d1d5db'
                }}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
                              </div>
                    </section>
                
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
                <li><a href="#services" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Consumer Bankruptcy</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Estate Planning</a></li>
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
