'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function BusinessEntityFormationPage() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)

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
            {/* Navigation Menu */}
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
          </div>
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
          src="/images/AdobeStock_303448308-scaled.webp"
          alt="Business and Entity Formation Banner"
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
        <div className="relative z-10 max-w-4xl text-right" style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <h1
            className="mb-4 leading-tight"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              fontWeight: '700',
              fontSize: '50px',
              color: '#FFFFFF !important',
              lineHeight: '1.3em'
            }}
          >
            Business and Entity Formation
          </h1>
          <p
            className="mb-8 leading-relaxed"
            style={{
              fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
              fontWeight: '600',
              fontSize: '18px',
              color: '#FFFFFF'
            }}
          >
            Expert guidance for forming your business entity in California
          </p>
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
      </section>

      {/* Introduction Section - Full Width */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
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
              Choosing the type of business to form should be done with thoughtful consideration and expert advice.
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
              This choice should be made based on the ownership structure, goals of the business, and other factors. Read below for some information on the most common types of businesses to form in the state of California.
            </p>
          </div>
        </div>
      </section>

      {/* Business Entity Types Section - 3 Columns */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-6"
              style={{
                fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                color: '#02adf0'
              }}
            >
              Business Entity Types
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1 - Sole Proprietorship */}
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/Sole Proprietorship.webp"
                  alt="Sole Proprietorship"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-lg shadow-lg mx-auto"
                />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Sole Proprietorship
              </h3>
              <div className="text-left space-y-3 mb-6">
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  A sole proprietorship is made for a single individual only. In a sole proprietorship, the owner is able to enjoy all of the profits of the business, but he or she is also personally liable for any debts and liabilities of the business. This does mean that there are no legal protections for the owner if someone decides to sue the business.
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  In a sole proprietorship there is no legal distinction between the company and the individual owner, nor is there a distinction when it comes time to file taxes. Owners of a sole proprietorship are subject to self-employment taxes and will report all earnings on a 1099 Form.
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  A sole proprietorship might be the right choice for your business, depending on what types of products or services you intend to sell. The Law Offices of Geoff Wiggs can help you to make that decision!
                </p>
              </div>
              <button
                className="inline-block px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  color: '#FFFFFF !important',
                  borderColor: '#02adf0',
                  borderRadius: '20px',
                  fontSize: '16px',
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                  fontWeight: '600 !important',
                  backgroundColor: '#02adf0',
                  width: 'auto',
                  minWidth: '140px'
                }}
              >
                Contact Us
              </button>
            </div>

            {/* Column 2 - Limited Liability Company */}
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/Limited Liability Company.webp"
                  alt="Limited Liability Company"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-lg shadow-lg mx-auto"
                />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                Limited Liability Company (LLC)
              </h3>
              <div className="text-left space-y-3 mb-6">
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  A Limited Liability Company can be created for a single owner or multiple owner business. One of the biggest draws towards an LLC is the fact that owners personal assets are not typically tied to the business in the event of a lawsuit or other legal event.
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  Similar to a sole proprietorship, profits can be passed on to the owner(s). With an LLC, the business can be taxed in a number of different ways depending on the ownership structure and other factors.
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  An LLC does require members to make certain disclosures to the government, which become public, and officially define the relationship between owners and managers of the business. One important thing to note is that LLCs are not able to issue stock, so if that is the intention of your business somewhere down the road, an LLC might not be for you. The Law Offices of Geoff Wiggs can help you to make the decision!
                </p>
              </div>
              <button
                className="inline-block px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  color: '#FFFFFF !important',
                  borderColor: '#02adf0',
                  borderRadius: '20px',
                  fontSize: '16px',
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                  fontWeight: '600 !important',
                  backgroundColor: '#02adf0',
                  width: 'auto',
                  minWidth: '140px'
                }}
              >
                Contact Us
              </button>
            </div>

            {/* Column 3 - S Corporation */}
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/images/S Corporation.webp"
                  alt="S Corporation"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-lg shadow-lg mx-auto"
                />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                S Corporation
              </h3>
              <div className="text-left space-y-3 mb-6">
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  An S Corporation is similar to an LLC in that the owners are personally protected in the case of lawsuit, however, they differ greatly when it comes to taxation.
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  In an S Corp, owners have chosen to consider the business a "pass-through entity" which means that the business is not subject to federal income tax. The owners of the business are also considered employees of the business, and they are subject to standard income taxes on their W-2 wages. They must be compensated fairly compared to others in similar roles within the industry.
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  Owners can accept shares of the profits, called distributions, which are taxed as income. In some S Corps, owners can save on self employment tax.
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: '#000000',
                    fontWeight: '400'
                  }}
                >
                  S Corporations are able to sell stock and attract investors, though there is substantial information that they need to disclose before this option becomes a possibility. The Law Offices of Geoff Wiggs can help you decide if this is the right option for your business!
                </p>
              </div>
              <button
                className="inline-block px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  color: '#FFFFFF !important',
                  borderColor: '#02adf0',
                  borderRadius: '20px',
                  fontSize: '16px',
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif !important",
                  fontWeight: '600 !important',
                  backgroundColor: '#02adf0',
                  width: 'auto',
                  minWidth: '140px'
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p
              className="text-xl leading-relaxed max-w-4xl mx-auto mb-8 font-bold"
              style={{
                fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                fontSize: '20px',
                lineHeight: '1.4',
                color: '#000000',
                fontWeight: '700'
              }}
            >
              Deciding what type of business to choose should be done with the utmost care and understanding. Contact us today for your free case evaluation!
            </p>
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
                Schedule Your Free Consultation
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
                <li><a href="/estate-planning" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Estate Planning</a></li>
                <li><a href="/probate-administration" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Probate and Trust Administration</a></li>
                <li><a href="/business-entity-formation" className="hover:text-blue-600 transition-colors duration-300 text-sm" style={{ color: '#02adf0' }}>Business and Entity Formation</a></li>
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
