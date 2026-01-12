'use client'

import { useState } from 'react'
import { MindMapSection as MindMapSectionType } from '@/data/surahs'

interface MindMapSectionProps {
  section: MindMapSectionType
  index: number
  totalSections: number
}

export default function MindMapSection({ section, index, totalSections }: MindMapSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Determine if section is on left or right side (alternating)
  const isLeft = index % 2 === 0

  return (
    <div className={`relative mb-16 ${isLeft ? 'pr-0 pl-0' : 'pl-0 pr-0'}`}>
      {/* Connection Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full" style={{ minHeight: '200px' }}>
          <defs>
            <marker
              id={`arrow-${index}`}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M0,0 L0,6 L9,3 z"
                fill="currentColor"
                className="text-green-400 dark:text-green-600"
              />
            </marker>
          </defs>
          <line
            x1="50%"
            y1="0"
            x2={isLeft ? '15%' : '85%'}
            y2="120px"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6,4"
            markerEnd={`url(#arrow-${index})`}
            className="text-green-400 dark:text-green-600 opacity-60"
          />
          <circle
            cx="50%"
            cy="0"
            r="6"
            fill="currentColor"
            className="text-green-500 dark:text-green-400 animate-pulse"
          />
        </svg>
      </div>

      {/* Section Card */}
      <div
        className={`relative z-10 ${
          isLeft ? 'mr-auto ml-0' : 'ml-auto mr-0'
        } max-w-lg w-full`}
        style={{ marginTop: '100px' }}
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
            isExpanded
              ? 'border-green-500 dark:border-green-400'
              : 'border-green-200 dark:border-green-800'
          } overflow-hidden transform hover:scale-105`}
        >
          {/* Header - Clickable */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-6 text-right hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0">
                {index}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  من الآية {section.ayahRange}
                </p>
              </div>
              <svg
                className={`w-6 h-6 text-green-600 dark:text-green-400 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6 space-y-4">
              {/* Themes as Tags */}
              {section.themes && section.themes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    المعاني والموضوعات:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {section.themes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories */}
              {section.stories && section.stories.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-purple-700 dark:text-purple-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    القصص والأمثلة:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {section.stories.map((story, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-lg text-sm border border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                      >
                        {story}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Message */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border-r-4 border-green-500 dark:border-green-400">
                <h4 className="text-base font-bold mb-3 text-green-700 dark:text-green-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  الرسالة الأساسية:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {section.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
