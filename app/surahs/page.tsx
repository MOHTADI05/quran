import Link from 'next/link'
import { getAllSurahs } from '@/data/surahs'
import Navbar from '@/components/Navbar'

export default function SurahsPage() {
  const surahs = getAllSurahs()

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold">رجوع إلى الصفحة الرئيسية</span>
          </Link>
          <h1 className="text-4xl font-bold mb-8 text-center text-green-600 dark:text-green-400">
            فهرس السور
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surahs.map((surah) => (
              <Link
                key={surah.number}
                href={`/surah/${surah.number}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {surah.nameArabic}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{surah.name}</p>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                    {surah.number}
                  </span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                    {surah.type}
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs">
                    {surah.totalAyahs} آية
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                  {surah.mainTheme}
                </p>
                <div className="mt-4 text-sm text-green-600 dark:text-green-400">
                  {surah.mindMap.length} قسم في الخريطة الذهنية →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

