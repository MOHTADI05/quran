import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSurahByNumber } from '@/data/surahs'
import { fetchAyahsForSurah } from '@/lib/quran-api'
import Navbar from '@/components/Navbar'
import MindMapSection from '@/components/MindMapSection'
import AyahsDisplay from '@/components/AyahsDisplay'

interface PageProps {
  params: {
    number: string
  }
}

export default async function SurahPage({ params }: PageProps) {
  const surahNumber = parseInt(params.number)
  const surah = getSurahByNumber(surahNumber)

  if (!surah) {
    notFound()
  }

  // Fetch ayahs from API if not already in surah data
  let ayahs = surah.ayahs
  if (!ayahs || ayahs.length === 0) {
    ayahs = await fetchAyahsForSurah(surahNumber)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/surahs"
            className="inline-flex items-center gap-2 mb-6 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold">رجوع إلى فهرس السور</span>
          </Link>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
            <div className="text-center mb-6">
              <h1 className="text-5xl font-bold mb-2 text-green-600 dark:text-green-400">
                {surah.nameArabic}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
                {surah.name}
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full">
                  رقم السورة: {surah.number}
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full">
                  {surah.type}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full">
                  عدد الآيات: {surah.totalAyahs}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h2 className="text-2xl font-bold mb-4 text-center">المحور العام</h2>
              <p className="text-xl text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                {surah.mainTheme}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
              الخريطة الذهنية للسورة
            </h2>
            {surah.mindMap.map((section, index) => (
              <MindMapSection key={index} section={section} index={index + 1} />
            ))}
          </div>

          <AyahsDisplay ayahs={ayahs} surahNumber={surahNumber} />

          {surah.virtues && surah.virtues.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 shadow-md border-r-4 border-yellow-500">
              <h3 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">
                فضائل السورة
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {surah.virtues.map((virtue, index) => (
                  <li key={index} className="text-lg">{virtue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

