'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProbateAdministrationPage() {
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
          src="/images/AdobeStock_251049533-2-scaled.webp"
          alt="Probate and Trust Administration Banner"
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
            The Law Offices of Geoff Wiggs<br />
            Will Make Probate & Trust Administration Easy
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
            Losing a loved one is hard enough. Let us help you gain access to the assets you've rightfully inherited.
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

      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
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
              It can be difficult to figure out whether your loved one's estate is subject to formal probate or not, even if your loved one has a will. It is best to contact an attorney, like Geoff Wiggs, to help make that determination.
            </p>
          </div>
        </div>
      </section>

      {/* What is Probate Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                What is Probate?
              </h2>
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
                According to the California Courts System, probate means that there is a court case that deals with:
              </p>
              <ul className="mb-4 space-y-2" style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif", fontSize: '17px', color: '#000000', fontWeight: '500' }}>
                <li>• Deciding if a will exists and is valid;</li>
                <li>• Figuring out who are the decedent's heirs or beneficiaries;</li>
                <li>• Figuring out how much the decedent's property is worth;</li>
                <li>• Taking care of the decedent's financial responsibilities;</li>
                <li>• Transferring the decedent's property to the heirs or beneficiaries.</li>
              </ul>
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
                Certain assets, like retirement accounts, life insurance, and sometimes bank accounts and real estate qualify for a simplified transfer process, but it's possible that not all assets will.
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
                If your loved one's assets total $166,250 or more, it is likely that a probate case and an attorney will be necessary.
              </p>
              <p
                className="mt-4"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  fontSize: '17px',
                  lineHeight: '1.4',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                At the Law Offices of Geoff Wiggs, we are here to help you every step of the way. Click here to read answers to some of our most frequently asked probate questions.
              </p>
            </div>
            <div>
              <Image
                src="/images/What is Probate.webp"
                alt="What is Probate"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is Trust Administration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/What is Trust Administration.webp"
                alt="What is Trust Administration"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{
                  fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif",
                  color: '#02adf0'
                }}
              >
                What is Trust Administration?
              </h2>
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
                Trust administration is the process of managing the assets and liabilities in a person's estate. An estate refers to the property and assets left behind after death.
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
                The trust administration process is critical in ensuring that beneficiaries receive the assets that they were promised in a will or awarded in a probate court. It is, however, a meticulous, time consuming process.
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
                A trust administrator must keep extremely detailed records and notes, as they are responsible for the property in question during the administration and potential probate process. As such, they must ensure that all debts are paid and all property is transferred to the correct beneficiary. There are consequences for not managing the estate correctly.
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
                Take the workload off your shoulders with The Law Offices of Geoff Wiggs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
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
