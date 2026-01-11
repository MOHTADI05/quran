import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { getJuzInfo } from '@/data/juz-data'
import { getAllSurahs } from '@/data/surahs'

interface PageProps {
  params: {
    number: string
  }
}

export default function JuzDetailPage({ params }: PageProps) {
  const juzNumber = parseInt(params.number)
  const juzInfo = getJuzInfo(juzNumber)
  const allSurahs = getAllSurahs()

  if (!juzInfo || juzNumber < 1 || juzNumber > 30) {
    notFound()
  }

  const startSurah = allSurahs.find(s => s.number === juzInfo.startSurah)
  const endSurah = allSurahs.find(s => s.number === juzInfo.endSurah)

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/juz"
            className="inline-flex items-center gap-2 mb-6 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold">رجوع إلى الأجزاء</span>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
            <div className="text-center mb-6">
              <h1 className="text-5xl font-bold mb-2 text-green-600 dark:text-green-400">
                الجزء {juzInfo.juz}
              </h1>
              <div className="flex justify-center gap-4 text-sm mt-4">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full">
                  من سورة {startSurah?.nameArabic} آية {juzInfo.startAyah}
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full">
                  إلى سورة {endSurah?.nameArabic} آية {juzInfo.endAyah}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
              السور في هذا الجزء
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {juzInfo.surahs.map((surahPart, index) => {
                const surah = allSurahs.find(s => s.number === surahPart.surahNumber)
                if (!surah) return null

                return (
                  <Link
                    key={index}
                    href={`/surah/${surah.number}`}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                          {surah.nameArabic}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{surah.name}</p>
                      </div>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                        {surah.number}
                      </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">الآيات:</span> من آية {surahPart.startAyah} إلى آية {surahPart.endAyah}
                      </p>
                      {surahPart.startAyah === 1 && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                          يبدأ الجزء من بداية هذه السورة
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 shadow-md border-r-4 border-blue-500">
            <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
              الأحزاب في هذا الجزء
            </h3>
            <div className="flex gap-4">
              <Link
                href={`/hizb/${(juzNumber - 1) * 2 + 1}`}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                حزب {(juzNumber - 1) * 2 + 1}
              </Link>
              <Link
                href={`/hizb/${juzNumber * 2}`}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                حزب {juzNumber * 2}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

