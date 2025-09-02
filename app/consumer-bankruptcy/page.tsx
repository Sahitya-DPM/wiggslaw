'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ConsumerBankruptcyPage() {
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

             {/* Banner Section */}
       <section 
         className="relative flex items-center justify-start px-4 sm:px-6 lg:px-8"
         style={{ 
           height: '75vh',
           padding: '0px'
         }}
       >
                  <Image
            src="/images/AdobeStock_353595333-scaled.webp"
            alt="Consumer Bankruptcy Banner"
            fill
            className="object-cover object-center"
            sizes="100vw"
            style={{ objectPosition: 'center top' }}
          />
                     {/* Black gradient overlay */}
           <div 
             className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 z-5"
             style={{ zIndex: 5 }}
           ></div>
         <div className="relative z-10 max-w-4xl text-left px-4 sm:px-0 sm:ml-16">
          <h1
            className="mb-4 leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-[50px]"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              fontWeight: '700',
              color: '#FFFFFF !important',
              lineHeight: '1.3em'
            }}
          >
            Get a Fresh Financial Start<br />
            While Protecting Your Assets
          </h1>
          <p
            className="mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg md:text-[18px]"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              fontWeight: '600',
              color: '#FFFFFF'
            }}
          >
            Filing bankruptcy is a last resort, but it doesn't mean you have to lose it all
          </p>
          <a href="#contact-form">
            <button
              className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:transform hover:-translate-y-1"
              style={{
                color: '#FFFFFF !important',
                borderColor: '#02adf0',
                borderRadius: '20px',
                fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                fontWeight: '600 !important',
                backgroundColor: '#02adf0'
              }}
            >
              Schedule Your Free Case Evaluation
            </button>
          </a>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
                                      <p
               className="text-lg leading-relaxed max-w-6xl mx-auto mb-6"
               style={{
                 fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                 fontSize: '17px',
                 lineHeight: '1.4',
                 color: '#000000',
                 fontWeight: '700'
               }}
             >
               Let's face it – no one actually wants to file bankruptcy.
             </p>
             <p
               className="text-lg leading-relaxed max-w-6xl mx-auto"
               style={{
                 fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                 fontSize: '17px',
                 lineHeight: '1.4',
                 color: '#000000',
                 fontWeight: '500'
               }}
             >
               Bankruptcy is not a part of anyone's financial plan, but filing bankruptcy may help you out of a financial hole that seems to just keep getting deeper and deeper. We understand your concern and are here to reassure you that bankruptcy doesn't have to mean losing all of the assets that you worked so hard to acquire – including your home.
             </p>
             <p
               className="text-lg leading-relaxed max-w-6xl mx-auto mt-4"
               style={{
                 fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                 fontSize: '17px',
                 lineHeight: '1.4',
                 color: '#000000',
                 fontWeight: '500'
               }}
             >
               The Law Offices of Geoff Wiggs have helped hundreds of consumers file bankruptcy to get a fresh financial start while keeping key assets.
             </p>
            <div className="mt-8">
              <a href="#contact-form">
                <button
                  className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                  style={{
                    color: '#FFFFFF !important',
                    borderColor: '#02adf0',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                    fontWeight: '600 !important',
                    backgroundColor: '#02adf0',
                    width: 'auto',
                    minWidth: '320px'
                  }}
                >
                  Schedule Your Free Case Evaluation
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Bankruptcy Reasons Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
                                <p
             className="text-4xl font-bold text-center mb-12"
             style={{
               fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
               fontSize: '17px',
               lineHeight: '1.4',
               color: '#000000',
               fontWeight: '700'
             }}
           >
             There are many reasons why consumers turn to bankruptcy. Continue reading below for a number of the most common cases we see.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* High Credit Card Debt */}
             <div className="bg-white rounded-xl shadow-lg p-8">
               <div className="mb-4">
                 <Image
                   src="/images/High Credit Card Debt.webp"
                   alt="High Credit Card Debt"
                   width={400}
                   height={300}
                   className="w-full h-auto object-cover rounded-lg"
                 />
               </div>
               <h3
                 className="text-2xl font-bold mb-4 text-center"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 High Credit Card Debt
               </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                Especially post-pandemic, credit card debt is higher than ever. High interest rate cards make repayment nearly impossible for the average consumer.
              </p>
            </div>

                         {/* Overwhelming Medical Bills */}
             <div className="bg-white rounded-xl shadow-lg p-8">
               <div className="mb-4">
                 <Image
                   src="/images/Overwhelming Medical Bills.webp"
                   alt="Overwhelming Medical Bills"
                   width={400}
                   height={300}
                   className="w-full h-auto object-cover rounded-lg"
                 />
               </div>
               <h3
                 className="text-2xl font-bold mb-4 text-center"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 Overwhelming Medical Bills
               </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                Without health insurance, or with low-reimbursement health insurance, even a short hospital stay can result in catastrophic fees – impossible for the average person to ever repay.
              </p>
            </div>

                         {/* Unpaid Taxes */}
             <div className="bg-white rounded-xl shadow-lg p-8">
               <div className="mb-4">
                 <Image
                   src="/images/Unpaid Taxes.webp"
                   alt="Unpaid Taxes"
                   width={400}
                   height={300}
                   className="w-full h-auto object-cover rounded-lg"
                 />
               </div>
               <h3
                 className="text-2xl font-bold mb-4"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 Unpaid Taxes
               </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                If you owe tax money to the state or federal government, we can definitely help. We may be able to help you discharge the taxes in full or set up a payment plan with little to no interest.
              </p>
            </div>

                         {/* Repossessed Vehicle */}
             <div className="bg-white rounded-xl shadow-lg p-8">
               <div className="mb-4">
                 <Image
                   src="/images/Repossessed Vehicle.webp"
                   alt="Repossessed Vehicle"
                   width={400}
                   height={300}
                   className="w-full h-auto object-cover rounded-lg"
                 />
               </div>
               <h3
                 className="text-2xl font-bold mb-4"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 Repossessed Vehicle
               </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                In some cases, we may be able to help you repay delinquent amounts and get a repossessed vehicle back in your possession.
              </p>
            </div>

                         {/* Vehicle Worth Less Than You Owe */}
             <div className="bg-white rounded-xl shadow-lg p-8">
               <div className="mb-4">
                 <Image
                   src="/images/Vehicle Worth Less Than You Owe.webp"
                   alt="Vehicle Worth Less Than You Owe"
                   width={400}
                   height={300}
                   className="w-full h-auto object-cover rounded-lg"
                 />
               </div>
               <h3
                 className="text-2xl font-bold mb-4"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 Vehicle Worth Less Than You Owe
               </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                When your vehicle is worth less than what you owe, bankruptcy can help you get out from under this burden and potentially keep your vehicle.
              </p>
            </div>

                         {/* Facing Eviction */}
             <div className="bg-white rounded-xl shadow-lg p-8">
               <div className="mb-4">
                 <Image
                   src="/images/Facing Eviction.webp"
                   alt="Facing Eviction"
                   width={400}
                   height={300}
                   className="w-full h-auto object-cover rounded-lg"
                 />
               </div>
               <h3
                 className="text-2xl font-bold mb-4"
                 style={{
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                   color: '#02adf0'
                 }}
               >
                 Facing Eviction
               </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                Eviction is a scary thought. Although it's not a long-term solution, filing bankruptcy may help you stay in your rented property longer, while you figure out your next move.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="/contact-us">
              <button
                className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  color: '#FFFFFF !important',
                  borderColor: '#02adf0',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                  fontWeight: '600 !important',
                  backgroundColor: '#02adf0',
                  width: 'auto',
                  minWidth: '180px'
                }}
              >
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Types of Bankruptcy Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              color: '#02adf0'
            }}
          >
            Types of Consumer Bankruptcies
          </h2>
          <p
            className="text-xl text-center mb-12"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              color: '#000000',
              fontWeight: '500'
            }}
          >
            95% of consumer bankruptcies fall into either Chapter 7 or Chapter 13.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chapter 7 Bankruptcy */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3
                className="text-3xl font-bold mb-6"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Chapter 7 Bankruptcy
              </h3>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                Chapter 7 is the bankruptcy that provides the most complete and immediate relief.
              </p>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                If everything is done properly, your outstanding debt can be fully discharged in about 4 months.
              </p>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                It is critically important for your bankruptcy attorney to make sure you actually qualify for a Chapter 7 bankruptcy before filing – otherwise you may be stuck in a bankruptcy that you cannot afford to complete.
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                In order to qualify for Chapter 7, your household income must be below the 'median income' for your state. The 'median income' changes every year in May. In the state of California, the law takes your income and the size of your family into account when calculating the 'median income'.
              </p>
            </div>

            {/* Chapter 13 Bankruptcy */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3
                className="text-3xl font-bold mb-6"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Chapter 13 Bankruptcy
              </h3>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                If you can't qualify for Chapter 7, or you have assets you want to protect, your best option is Chapter 13.
              </p>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                A Chapter 13 bankruptcy allows you and your attorney to develop a repayment plan that should allow you to only pay back a fraction of your debt.
              </p>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                Bankruptcy attorneys have developed different strategies to use the Chapter 13 process for a number of different purposes.
              </p>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                Chapter 13 bankruptcy is a useful tool to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '17px',
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}
                >
                  Repay mortgage delinquencies and arrears over the course of 3 to 5 years
                </li>
                <li
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '17px',
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}
                >
                  Repay tax liabilities over time, preventing the IRS or Franchise Tax Board from taking devastating collection actions against you during that time
                </li>
                <li
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '17px',
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}
                >
                  Halt or delay foreclosure proceedings on your real property
                </li>
                <li
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '17px',
                    lineHeight: '1.4',
                    color: '#000000',
                    fontWeight: '500'
                  }}
                >
                  Give you more time to attempt to refinance or sell your real property to make sure you do not lose your valuable equity
                </li>
              </ul>
            </div>
          </div>

                     <div className="text-center mt-12">
             <a href="#contact-form">
               <button
                 className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                 style={{
                   color: '#FFFFFF !important',
                   borderColor: '#02adf0',
                   borderRadius: '20px',
                   fontSize: '18px',
                   fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                   fontWeight: '600 !important',
                   backgroundColor: '#02adf0',
                   width: 'auto',
                   minWidth: '380px'
                 }}
               >
                 Schedule Your Free Case Evaluation Today
               </button>
             </a>
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
                <li><a href="/consumer-bankruptcy" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Consumer Bankruptcy</a></li>
                <li><a href="#estate-planning" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Estate Planning</a></li>
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
