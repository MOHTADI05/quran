import { MindMapSection as MindMapSectionType } from '@/data/surahs'

interface MindMapSectionProps {
  section: MindMapSectionType
  index: number
}

export default function MindMapSection({ section, index }: MindMapSectionProps) {
  return (
    <div className="mind-map-section">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
          {index}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            {section.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            من الآية {section.ayahRange}
          </p>
        </div>
      </div>

      {section.themes && section.themes.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
            المعاني والموضوعات:
          </h4>
          <div className="flex flex-wrap gap-2">
            {section.themes.map((theme, idx) => (
              <span key={idx} className="theme-tag">
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}

      {section.stories && section.stories.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
            القصص:
          </h4>
          <div className="flex flex-wrap gap-2">
            {section.stories.map((story, idx) => (
              <span key={idx} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                {story}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-r-2 border-green-400">
        <h4 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-400">
          الرسالة الأساسية:
        </h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {section.message}
        </p>
      </div>
    </div>
  )
}

