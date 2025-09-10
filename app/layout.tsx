import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext'

export const metadata: Metadata = {
  title: 'Wiggs Law | Bankruptcy and Estate Administration',
  description: 'Specializing in bankruptcy, estate planning, probate, and business formation. Contact us today for your FREE consultation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/webp" sizes="150x150" href="/images/favicon-150x150.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* UserWay Accessibility Widget */}
        <script data-account="9NLbkVVtmd" src="https://cdn.userway.org/widget.js"></script>
        
        {/* Ngage Messenger */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(ng,a,g,e,l,i,ve){l = a.createElement(g),l.async=1,l.src=ng+e;var c=a.getElementsByTagName(g)[0];c.parentNode.insertBefore(l,c);var i=a.createElement('div');var ve='style';i.id='nGageLH',i[ve].position='fixed',i[ve].right='0px',i[ve].bottom='0px',i[ve].zIndex='5000',a.body&&a.body.appendChild(i);}('https://messenger.ngageics.com/ilnksrvr.aspx?websiteid=',document,'script','120-21-54-50-217-9-18-150'));`
        }} />
        
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WKTGG55');`
        }} />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="xIY9sCIdwK2bNMNPyu6Ts16RcnBiDGZm85QlOp_jTjA" />
      </head>
      <body style={{ fontFamily: "'Montserrat', Helvetica, Arial, Lucida, sans-serif" }}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKTGG55"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <AuthProvider>
          {process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'AIzaSyDemoKey123456789' ? (
            children
          ) : (
            <FirebaseAuthProvider>
              {children}
            </FirebaseAuthProvider>
          )}
        </AuthProvider>
      </body>
    </html>
  )
}
