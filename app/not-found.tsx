import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-200">404</h1>
          <h2 className="text-3xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            الصفحة غير موجودة
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
    </>
  )
}

