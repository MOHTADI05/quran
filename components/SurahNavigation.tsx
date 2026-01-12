'use client'

import { useState, useEffect } from 'react'

interface NavigationItem {
  id: string
  label: string
  icon: JSX.Element
}

const navigationItems: NavigationItem[] = [
  {
    id: 'mindmap',
    label: 'الخريطة الذهنية',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 'ayahs',
    label: 'آيات السورة',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 'recitation',
    label: 'التلاوة والحفظ',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

export default function SurahNavigation() {
  const [activeSection, setActiveSection] = useState<string>('mindmap')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 200

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId)
            break
          }
        }
      }

      // Show/hide navigation based on scroll position
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Offset for fixed navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-green-200 dark:border-green-700 p-2">
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative group flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300
                  ${
                    isActive
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                  }
                `}
                title={item.label}
              >
                <div
                  className={`
                  ${isActive ? 'text-white' : 'text-green-600 dark:text-green-400'}
                `}
                >
                  {item.icon}
                </div>
                <span
                  className={`
                  font-semibold text-sm whitespace-nowrap
                  ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
                `}
                >
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
                
                {/* Tooltip */}
                <div className="absolute right-full mr-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-700"></div>
                </div>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

