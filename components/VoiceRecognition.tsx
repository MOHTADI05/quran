'use client'

import { useState, useEffect, useRef } from 'react'
import { Ayah } from '@/lib/quran-api'

interface VoiceRecognitionProps {
  ayahs: Ayah[]
  surahNumber: number
  surahName: string
  surahNameArabic: string
}

export default function VoiceRecognition({
  ayahs,
  surahNumber,
  surahName,
  surahNameArabic,
}: VoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false)
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0)
  const [recognizedText, setRecognizedText] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [recognition, setRecognition] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<any>(null)
  const isListeningRef = useRef(false)
  const isPausedRef = useRef(false)
  const currentAyahIndexRef = useRef(0)
  const isTransitioningRef = useRef(false)

  // Update refs when state changes
  useEffect(() => {
    isListeningRef.current = isListening
    isPausedRef.current = isPaused
    currentAyahIndexRef.current = currentAyahIndex
    isTransitioningRef.current = isTransitioning
  }, [isListening, isPaused, currentAyahIndex, isTransitioning])

  // Initialize speech recognition once
  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (!SpeechRecognition) {
        setError('المتصفح لا يدعم التعرف الصوتي. يرجى استخدام Chrome أو Edge')
        return
      }

      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'ar-SA' // Arabic (Saudi Arabia)
      recognitionInstance.maxAlternatives = 1

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        const fullText = (finalTranscript + interimTranscript).trim()
        setRecognizedText(fullText)

        // Check if current ayah is being recited correctly
        // Use refs to get current values without causing re-renders
        if (currentAyahIndexRef.current < ayahs.length && !isTransitioningRef.current && fullText.length > 0) {
          const currentAyah = ayahs[currentAyahIndexRef.current]
          // Check more frequently with final results
          if (finalTranscript.length > 0 || fullText.length > currentAyah.text.length * 0.3) {
            checkRecitation(fullText, currentAyah.text)
          }
        }
      }

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        // Don't show error for 'no-speech' as it's common
        if (event.error === 'not-allowed') {
          setError('السماح بالوصول إلى الميكروفون مطلوب')
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
          setError(`خطأ في التعرف الصوتي: ${event.error}`)
        }
      }

      recognitionInstance.onend = () => {
        // Use refs to check current state
        if (isListeningRef.current && !isPausedRef.current) {
          // Restart recognition if still listening
          setTimeout(() => {
            if (isListeningRef.current && !isPausedRef.current && recognitionInstance) {
              try {
                recognitionInstance.start()
              } catch (e) {
                // Already started or error - ignore
                console.log('Recognition restart skipped:', e)
              }
            }
          }, 100)
        }
      }

      recognitionRef.current = recognitionInstance
      setRecognition(recognitionInstance)

      return () => {
        if (recognitionInstance) {
          try {
            recognitionInstance.stop()
          } catch (e) {
            // Ignore errors during cleanup
          }
        }
        recognitionRef.current = null
      }
    }
  }, []) // Only run once on mount

  const checkRecitation = (recognized: string, correctText: string) => {
    // Use ref to check if transitioning
    if (isTransitioningRef.current) {
      return
    }

    // Normalize both texts for comparison (remove diacritics, normalize spaces)
    const normalize = (text: string) => {
      return text
        .replace(/[\u064B-\u065F\u0670]/g, '') // Remove Arabic diacritics
        .replace(/[،,؛;]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ')
        .trim()
    }

    const normalizedRecognized = normalize(recognized)
    const normalizedCorrect = normalize(correctText)

    // Check if recognized text contains significant portion of correct text
    const recognizedLength = normalizedRecognized.length
    const correctLength = normalizedCorrect.length
    
    // Check if recognized text is long enough (at least 50% of correct text)
    if (recognizedLength < correctLength * 0.4) {
      return // Not enough text recognized yet
    }

    // Calculate similarity using multiple methods
    const similarity = calculateSimilarity(normalizedRecognized, normalizedCorrect)
    const containsMatch = normalizedRecognized.includes(normalizedCorrect.substring(0, Math.min(correctLength, recognizedLength))) ||
                         normalizedCorrect.includes(normalizedRecognized.substring(0, Math.min(recognizedLength, correctLength)))
    
    // Lower threshold and check multiple conditions
    const threshold = 0.5 // 50% similarity required
    
    // Check if we have enough similarity or if the recognized text contains the correct text
    if ((similarity >= threshold || containsMatch || recognizedLength >= correctLength * 0.6) && !isTransitioningRef.current) {
      if (!isCorrect) { // Only trigger once per ayah
        setIsCorrect(true)
        setIsTransitioning(true)
        isTransitioningRef.current = true
        
        // Clear any existing timeout
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current)
        }
        
        // Automatically move to next ayah after a short delay
        transitionTimeoutRef.current = setTimeout(() => {
          const currentIndex = currentAyahIndexRef.current
          if (currentIndex < ayahs.length - 1) {
            const nextIndex = currentIndex + 1
            setCurrentAyahIndex(nextIndex)
            currentAyahIndexRef.current = nextIndex
            setRecognizedText('')
            setIsCorrect(null)
            setIsTransitioning(false)
            isTransitioningRef.current = false
            setProgress((nextIndex / ayahs.length) * 100)
          } else {
            // Finished all ayahs
            stopListening()
            setIsCorrect(true)
            setIsTransitioning(false)
            isTransitioningRef.current = false
          }
        }, 1500) // 1.5 second delay before moving to next ayah
      }
    } else if (recognizedLength > correctLength * 0.3 && !isTransitioningRef.current) {
      setIsCorrect(false)
    }
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    if (str1.length === 0 && str2.length === 0) return 1.0
    if (str1.length === 0 || str2.length === 0) return 0.0

    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1

    // Check if shorter string is contained in longer string (exact match)
    if (longer.includes(shorter)) {
      return Math.min(1.0, shorter.length / longer.length)
    }

    // Check if longer string starts with shorter string
    if (longer.startsWith(shorter)) {
      return 0.85
    }

    // Check if shorter string is at the end of longer string
    if (longer.endsWith(shorter)) {
      return 0.85
    }

    // Calculate word-based similarity
    const words1 = str1.split(/\s+/).filter(w => w.length > 0)
    const words2 = str2.split(/\s+/).filter(w => w.length > 0)
    
    if (words1.length === 0 || words2.length === 0) {
      // Fallback to character-based similarity
      let matches = 0
      const minLength = Math.min(str1.length, str2.length)
      for (let i = 0; i < minLength; i++) {
        if (str1[i] === str2[i]) {
          matches++
        }
      }
      return matches / longer.length
    }

    // Count matching words (more lenient matching)
    let matchingWords = 0
    const shorterWords = words1.length < words2.length ? words1 : words2
    const longerWords = words1.length >= words2.length ? words1 : words2
    
    for (const word of shorterWords) {
      // Check for exact match or substring match
      if (longerWords.some(lw => {
        return lw === word || 
               lw.includes(word) || 
               word.includes(lw) ||
               lw.startsWith(word) ||
               word.startsWith(lw)
      })) {
        matchingWords++
      }
    }

    const wordSimilarity = matchingWords / Math.max(words1.length, words2.length)

    // Calculate character-based similarity using Levenshtein-like approach
    const minLength = Math.min(str1.length, str2.length)
    const maxLength = Math.max(str1.length, str2.length)
    let charMatches = 0
    
    // Check character-by-character for first part
    for (let i = 0; i < minLength; i++) {
      if (str1[i] === str2[i]) {
        charMatches++
      }
    }
    
    // Also check if characters exist in both strings
    const str1Chars = new Set(str1.split(''))
    const str2Chars = new Set(str2.split(''))
    let commonChars = 0
    str1Chars.forEach(char => {
      if (str2Chars.has(char)) {
        commonChars++
      }
    })
    
    const charSimilarity = Math.max(
      charMatches / maxLength,
      commonChars / Math.max(str1Chars.size, str2Chars.size)
    )

    // Return weighted average (favor word similarity)
    return Math.max(wordSimilarity * 0.7 + charSimilarity * 0.3, wordSimilarity, charSimilarity)
  }

  const startListening = () => {
    const rec = recognitionRef.current || recognition
    if (rec) {
      try {
        rec.start()
        setIsListening(true)
        isListeningRef.current = true
        setIsPaused(false)
        isPausedRef.current = false
        setError(null)
      } catch (e: any) {
        // Ignore if already started
        if (e.message && !e.message.includes('already')) {
          setError('فشل في بدء التعرف الصوتي')
        }
      }
    }
  }

  const stopListening = () => {
    const rec = recognitionRef.current || recognition
    if (rec) {
      try {
        rec.stop()
      } catch (e) {
        // Ignore errors
      }
      setIsListening(false)
      isListeningRef.current = false
      setIsPaused(false)
      isPausedRef.current = false
    }
  }

  const pauseListening = () => {
    const rec = recognitionRef.current || recognition
    if (rec && isListeningRef.current) {
      try {
        rec.stop()
      } catch (e) {
        // Ignore errors
      }
      setIsPaused(true)
      isPausedRef.current = true
    }
  }

  const resumeListening = () => {
    if (isPausedRef.current) {
      startListening()
    }
  }

  const resetRecitation = () => {
    // Clear any pending transitions
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = null
    }
    setCurrentAyahIndex(0)
    setRecognizedText('')
    setIsCorrect(null)
    setProgress(0)
    setIsTransitioning(false)
    stopListening()
  }

  const goToAyah = (index: number) => {
    if (index >= 0 && index < ayahs.length) {
      // Clear any pending transitions
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
        transitionTimeoutRef.current = null
      }
      setCurrentAyahIndex(index)
      setRecognizedText('')
      setIsCorrect(null)
      setIsTransitioning(false)
      setProgress((index / ayahs.length) * 100)
    }
  }

  if (error && !recognition) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-r-4 border-red-500">
        <p className="text-red-700 dark:text-red-400">{error}</p>
      </div>
    )
  }

  const currentAyah = ayahs[currentAyahIndex]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
        🎤 التلاوة والحفظ
      </h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            التقدم: {currentAyahIndex + 1} / {ayahs.length}
          </span>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Ayah Display */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
        <div className="text-center">
          <div className="inline-block bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mb-4">
            {currentAyah.number}
          </div>
          <p className="text-4xl leading-loose text-gray-800 dark:text-gray-100 arabic-text text-right font-arabic mb-4">
            {currentAyah.text}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            آية {currentAyah.number} من سورة {surahNameArabic}
          </p>
        </div>
      </div>

      {/* Central Voice Button */}
      <div className="flex flex-col items-center justify-center mb-8">
        {!isListening && !isPaused ? (
          <button
            onClick={startListening}
            className="w-32 h-32 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            title="ابدأ التلاوة"
          >
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </button>
        ) : isListening ? (
          <button
            onClick={stopListening}
            className="w-32 h-32 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 relative"
            title="إيقاف التلاوة"
          >
            <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75" />
            <svg className="w-16 h-16 relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={resumeListening}
            className="w-32 h-32 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800"
            title="متابعة التلاوة"
          >
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </button>
        )}

        {isListening && (
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-600 dark:text-red-400 font-semibold">جاري الاستماع...</span>
            </div>
            {recognizedText && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                يتم التعرف على: {recognizedText.substring(0, 50)}...
              </p>
            )}
          </div>
        )}

        {/* Status Messages */}
        {isCorrect === true && (
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-r-4 border-green-500 max-w-md">
            <p className="text-green-700 dark:text-green-400 font-bold text-lg text-center">
              ✓ صحيح! جاري الانتقال للآية التالية...
            </p>
          </div>
        )}

        {isCorrect === false && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-r-4 border-yellow-500 max-w-md">
            <p className="text-yellow-700 dark:text-yellow-400 text-center">
              حاول مرة أخرى. تأكد من التلاوة الصحيحة
            </p>
          </div>
        )}
      </div>

      {/* Secondary Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={resetRecitation}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          إعادة البدء
        </button>
        {isListening && (
          <button
            onClick={pauseListening}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
          >
            إيقاف مؤقت
          </button>
        )}
      </div>

      {/* Ayah Navigation */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-bold mb-4 text-center">التنقل بين الآيات</h3>
        <div className="flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto">
          {ayahs.map((ayah, index) => (
            <button
              key={index}
              onClick={() => goToAyah(index)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                index === currentAyahIndex
                  ? 'bg-green-600 text-white ring-2 ring-green-300'
                  : index < currentAyahIndex
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {ayah.number}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-r-4 border-red-500">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

