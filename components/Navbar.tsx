import Link from 'next/link'
import Image from 'next/image'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/favicon.png"
              alt="القرآن الكريم"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
              القرآن الكريم
            </span>
          </Link>
          
          <div className="hidden md:flex flex-1 justify-center max-w-md mx-4">
            <SearchBar />
          </div>

          <div className="flex space-x-2 md:space-x-4 space-x-reverse flex-shrink-0">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium"
            >
              الرئيسية
            </Link>
            <Link
              href="/surahs"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium"
            >
              السور
            </Link>
            <Link
              href="/juz"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium"
            >
              الأجزاء
            </Link>
            <Link
              href="/search"
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-2 py-2 rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

