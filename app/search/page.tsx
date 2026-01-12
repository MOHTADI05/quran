import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { searchAyahs } from '@/lib/search-api'
import { getAllSurahs } from '@/data/surahs'

interface PageProps {
  searchParams: {
    q?: string
  }
}

function SearchResults({ query }: { query: string }) {
  return (
    <Suspense fallback={<div className="text-center py-8">جاري البحث...</div>}>
      <SearchResultsContent query={query} />
    </Suspense>
  )
}

async function SearchResultsContent({ query }: { query: string }) {
  const results = await searchAyahs(query)
  const allSurahs = getAllSurahs()

  return (
    <div className="space-y-6">
      {results.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            لم يتم العثور على نتائج للبحث: <strong>{query}</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            جرب البحث بكلمات مختلفة أو تحقق من الإملاء
          </p>
        </div>
      ) : (
        <>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              تم العثور على <strong className="text-green-600 dark:text-green-400">{results.length}</strong> نتيجة للبحث: <strong>{query}</strong>
            </p>
          </div>

          <div className="space-y-4">
            {results.map((result, index) => {
              const surah = allSurahs.find(s => s.number === result.surahNumber)
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-r-4 border-green-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Link
                        href={`/surah/${result.surahNumber}`}
                        className="text-2xl font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      >
                        {result.surahNameArabic}
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {result.surahName} - آية {result.ayahNumber}
                      </p>
                    </div>
                    <Link
                      href={`/surah/${result.surahNumber}#ayah-${result.ayahNumber}`}
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-bold hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                    >
                      عرض السورة
                    </Link>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-3xl leading-relaxed text-gray-800 dark:text-gray-100 arabic-text text-right font-arabic">
                      {result.ayahText}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-left mt-2">
                      آية {result.ayahNumber} من سورة {result.surahNumber}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q?.trim()

  if (!query || query.length < 2) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen p-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 text-center">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                يرجى إدخال كلمة بحث (على الأقل حرفين)
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold">رجوع إلى الصفحة الرئيسية</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-green-600 dark:text-green-400">
              نتائج البحث
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              البحث عن: <strong>{query}</strong>
            </p>
          </div>

          <SearchResults query={query} />
        </div>
      </main>
    </>
  )
}

