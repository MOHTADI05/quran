import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/favicon.png"
              alt="القرآن الكريم"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              القرآن الكريم
            </span>
          </Link>
          <div className="flex space-x-4 space-x-reverse">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              الرئيسية
            </Link>
            <Link
              href="/surahs"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              السور
            </Link>
            <Link
              href="/juz"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              الأجزاء
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

