interface Ayah {
  number: number;
  text: string;
}

interface AyahsDisplayProps {
  ayahs: Ayah[];
  surahNumber: number;
}

export default function AyahsDisplay({ ayahs, surahNumber }: AyahsDisplayProps) {
  if (!ayahs || ayahs.length === 0) {
    return (
      <div className="mb-8">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-r-4 border-yellow-500">
          <p className="text-gray-700 dark:text-gray-300">
            جاري تحميل الآيات...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
        آيات السورة
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <div className="space-y-8">
          {ayahs.map((ayah) => (
            <div
              key={ayah.number}
              className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  {ayah.number}
                </div>
                <div className="flex-1">
                  <p className="text-4xl leading-loose text-gray-800 dark:text-gray-100 arabic-text text-right font-arabic mb-2">
                    {ayah.text}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-left mt-2">
                    آية {ayah.number} من سورة {surahNumber}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

