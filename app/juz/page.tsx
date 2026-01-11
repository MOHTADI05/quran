import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { getAllJuzs, getJuzInfo } from '@/data/juz-data'
import { getAllSurahs } from '@/data/surahs'

export default function JuzPage() {
  const juzs = Array.from({ length: 30 }, (_, i) => i + 1)
  const allJuzs = getAllJuzs()

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
            الأجزاء والأحزاب
          </h1>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">الأجزاء (30 جزء)</h2>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
              {juzs.map((juz) => {
                const juzInfo = getJuzInfo(juz)
                const surahs = getAllSurahs()
                const startSurah = surahs.find(s => s.number === juzInfo?.startSurah)
                const endSurah = surahs.find(s => s.number === juzInfo?.endSurah)
                
                return (
                  <Link
                    key={juz}
                    href={`/juz/${juz}`}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all border-2 border-green-500 hover:border-green-600 group"
                  >
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform">
                      {juz}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">جزء</div>
                    {startSurah && endSurah && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {startSurah.nameArabic} - {endSurah.nameArabic}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">الأحزاب (60 حزب)</h2>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
              {Array.from({ length: 60 }, (_, i) => i + 1).map((hizb) => {
                const juzNumber = Math.ceil(hizb / 2)
                return (
                  <Link
                    key={hizb}
                    href={`/hizb/${hizb}`}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all border-2 border-blue-500 hover:border-blue-600 group"
                  >
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                      {hizb}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">حزب</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      جزء {juzNumber}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">معلومات</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              القرآن الكريم مقسم إلى <strong>30 جزء</strong>، وكل جزء مقسم إلى <strong>حزبين</strong> (60 حزب إجمالاً)،
              وكل حزب مقسم إلى <strong>أرباع</strong> (ربع حزب). هذا التقسيم يساعد في قراءة وتلاوة القرآن بشكل منظم.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

