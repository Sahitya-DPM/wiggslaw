'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const slideReviews = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentReviewIndex(prev => prev === 0 ? 2 : prev - 1)
    } else {
      setCurrentReviewIndex(prev => prev === 2 ? 0 : prev + 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentReviewIndex(index)
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
              <li><a href="#home" className="text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide text-xl">HOME</a></li>
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
                  <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg text-black text-opacity-60 font-medium hover:text-wiggs-blue transition-colors duration-300 uppercase tracking-wide rounded-lg hover:bg-gray-50">HOME</a></li>
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
        </div>
      </section>

      {/* Banner Section */}
      <section id="banner" className="relative w-full text-left flex" style={{ height: '75vh', padding: '0px' }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner-image.webp"
            alt="Legal Office Banner"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        <div className="relative z-10 max-w-5xl px-4 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col justify-center">
          <h1 
            className="mb-4 sm:mb-8 text-white leading-[1.3em] text-3xl sm:text-4xl md:text-5xl lg:text-[50px]"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: '1.3em'
            }}
          >
            Expert Legal Counsel<br />
            When You Need it Most
          </h1>
          <p 
            className="mb-6 sm:mb-10 max-w-4xl text-white text-base sm:text-lg md:text-[18px]"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              fontWeight: 600
            }}
          >
            Specializing in bankruptcy, estate planning, probate, and business formation.
          </p>
          <a href="#contact-form">
            <button 
              className="text-white border-2 border-[#02adf0] rounded-[20px] text-sm sm:text-base font-montserrat font-semibold bg-[#02adf0] px-4 sm:px-6 py-2 sm:py-3 hover:bg-[#0298d6] hover:border-[#0298d6] transition-all duration-300 w-full sm:w-auto"
              style={{
                fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                color: '#FFFFFF',
                borderColor: '#02adf0',
                borderRadius: '20px',
                fontWeight: '600',
                backgroundColor: '#02adf0',
                maxWidth: '340px'
              }}
            >
              Schedule Your Free Consultation
            </button>
          </a>
        </div>
      </section>

      {/* Introduction Text Section */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center leading-relaxed text-base sm:text-lg md:text-xl"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              lineHeight: '1.7em',
              fontWeight: '500',
              WebkitFontSmoothing: 'antialiased',
              color: '#000000'
            }}
          >
            When you need legal advice and don't know where to begin, trust the Law Offices of Geoff Wiggs to provide the services you need. We pride ourselves on providing expert advice and creating legal strategies with professionalism, skill, and compassion. Our specialities include consumer bankruptcy, estate planning, probate and trust administration, and business formation.
          </p>
        </div>
      </section>

      {/* Case Evaluation Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              color: '#02adf0'
            }}
          >
            Schedule Your Free Case Evaluation Today
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Consumer Bankruptcy */}
            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <Image
                  src="/images/Consumer Bankruptcy.webp"
                  alt="Consumer Bankruptcy"
                  width={550}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Consumer Bankruptcy
              </h3>
              <p
                className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-[17px]"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontWeight: '500',
                  color: '#000000'
                }}
              >
                Declaring bankruptcy does not have to mean that you lose your home and all of your assets.
              </p>
              <a href="/consumer-bankruptcy">
                <button
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-300 text-sm sm:text-base md:text-lg w-full sm:w-auto"
                  style={{
                    backgroundColor: '#02adf0',
                    color: '#FFFFFF',
                    borderColor: '#02adf0',
                    borderRadius: '20px',
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontWeight: '600'
                  }}
                >
                  Learn More
                </button>
              </a>
            </div>

            {/* Estate Planning */}
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/Estate Planning.webp"
                  alt="Estate Planning"
                  width={550}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Estate Planning
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontWeight: '500',
                  fontSize: '17px',
                  color: '#000000'
                }}
              >
                Planning for your family's future is critical, and choosing the right attorney is key in ensuring that your last wishes are granted.
              </p>
              <a href="/estate-planning">
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  style={{
                    backgroundColor: '#02adf0',
                    color: '#FFFFFF',
                    borderColor: '#02adf0',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontWeight: '600'
                  }}
                >
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Legal Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Probate and Trust Administration */}
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/Consumer Bankruptcy.webp"
                  alt="Probate and Trust Administration"
                  width={550}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Probate and Trust Administration
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontWeight: '500',
                  fontSize: '17px',
                  color: '#000000'
                }}
              >
                When you lose a loved one, you have enough on your mind. Take the guesswork out of the complicated probate and trust administration processes.
              </p>
              <a href="/probate-administration">
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  style={{
                    backgroundColor: '#02adf0',
                    color: '#FFFFFF',
                    borderColor: '#02adf0',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontWeight: '600'
                  }}
                >
                  Learn More
                </button>
              </a>
            </div>

            {/* Business and Entity Formation */}
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/Estate Planning.webp"
                  alt="Business and Entity Formation"
                  width={550}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Business and Entity Formation
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontWeight: '500',
                  fontSize: '17px',
                  color: '#000000'
                }}
              >
                Starting a business is exciting, but choosing the type of business to form will have lasting implications. Ensure you make the right choices for your business – the first time.
              </p>
              <a href="/business-entity-formation">
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  style={{
                    backgroundColor: '#02adf0',
                    color: '#FFFFFF',
                    borderColor: '#02adf0',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontWeight: '600'
                  }}
                >
                  Learn More
                </button>
              </a>
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

      {/* Professional Memberships Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="/images/nacba.webp"
                alt="NACBA"
                width={200}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="text-center">
              <Image
                src="/images/naca.webp"
                alt="NACA"
                width={200}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="text-center">
              <Image
                src="/images/consumer attroneys.webp"
                alt="Consumer Attorneys"
                width={200}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

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
    </main>
  )
}
