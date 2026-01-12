import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSurahByNumber } from '@/data/surahs'
import { fetchAyahsForSurah } from '@/lib/quran-api'
import Navbar from '@/components/Navbar'
import MindMapSection from '@/components/MindMapSection'
import AyahsDisplay from '@/components/AyahsDisplay'
import VoiceRecognition from '@/components/VoiceRecognition'
import SurahNavigation from '@/components/SurahNavigation'

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
      <SurahNavigation />
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

          <div id="mindmap" className="mb-8 scroll-mt-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-green-600 dark:text-green-400">
              🗺️ الخريطة الذهنية للسورة
            </h2>
            
            {/* Central Node - Main Theme */}
            <div className="relative mb-20">
              <div className="flex justify-center">
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                  
                  {/* Central Circle */}
                  <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800 transform hover:scale-110 transition-transform duration-300 z-20">
                    <div className="text-4xl font-bold mb-2">{surah.nameArabic}</div>
                    <div className="text-xs opacity-90 bg-white/20 px-3 py-1 rounded-full">المحور العام</div>
                  </div>
                  
                  {/* Connection points around center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {surah.mindMap.map((_, index) => {
                      const angle = (index / surah.mindMap.length) * 2 * Math.PI - Math.PI / 2
                      const radius = 100
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      
                      return (
                        <div
                          key={index}
                          className="absolute w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mind Map Sections */}
            <div className="space-y-4">
              {surah.mindMap.map((section, index) => (
                <MindMapSection
                  key={index}
                  section={section}
                  index={index + 1}
                  totalSections={surah.mindMap.length}
                />
              ))}
            </div>
          </div>

          <div id="ayahs" className="scroll-mt-24">
            <AyahsDisplay ayahs={ayahs} surahNumber={surahNumber} />
          </div>

          {ayahs && ayahs.length > 0 && (
            <div id="recitation" className="scroll-mt-24">
              <VoiceRecognition
                ayahs={ayahs}
                surahNumber={surahNumber}
                surahName={surah.name}
                surahNameArabic={surah.nameArabic}
              />
            </div>
          )}

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

