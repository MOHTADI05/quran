import Link from 'next/link'
import { getAllSurahs } from '@/data/surahs'
import Navbar from '@/components/Navbar'

export default function Home() {
  const surahs = getAllSurahs()

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-green-600 dark:text-green-400">
            القرآن الكريم
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            قراءة وتفهم القرآن الكريم مع الخرائط الذهنية
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            href="/pdf"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-green-500 hover:border-green-600"
          >
            <h2 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">
              📖 قراءة PDF
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              قراءة المصحف بصيغة PDF مع التنقل بين الصفحات
            </p>
          </Link>

          <Link
            href="/surahs"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-500 hover:border-blue-600"
          >
            <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
              📚 فهرس السور
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              تصفح جميع السور مع الخرائط الذهنية
            </p>
          </Link>

          <Link
            href="/juz"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-500 hover:border-purple-600"
          >
            <h2 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">
              📑 الأجزاء والأحزاب
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              التنقل حسب الأجزاء والأحزاب والأرباع
            </p>
          </Link>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">السور المتاحة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {surahs.map((surah) => (
              <Link
                key={surah.number}
                href={`/surah/${surah.number}`}
                className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors border border-green-200 dark:border-green-800"
              >
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {surah.number}
                </div>
                <div className="text-lg font-semibold mt-2">{surah.nameArabic}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {surah.type}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
    </>
  )
}

