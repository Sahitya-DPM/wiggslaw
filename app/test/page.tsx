'use client'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600 mb-8">If you can see this, the basic setup is working!</p>
        <div className="space-y-4">
          <a 
            href="/admin/login" 
            className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Admin Login
          </a>
          <a 
            href="/" 
            className="block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go to Home Page
          </a>
        </div>
      </div>
    </div>
  );
}
