'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PDFViewer from '@/components/PDFViewer'
import Navbar from '@/components/Navbar'

export default function PDFPage() {
  const [pdfFile, setPdfFile] = useState<string | null>(null)

  useEffect(() => {
    // Try to load PDF from public folder
    const checkPublicPDF = async () => {
      try {
        const response = await fetch('/quran.pdf', { method: 'HEAD' })
        if (response.ok) {
          setPdfFile('/quran.pdf')
        }
      } catch (error) {
        // PDF not found in public folder, user can upload
      }
    }
    checkPublicPDF()
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file)
      setPdfFile(fileUrl)
    } else {
      alert('الرجاء اختيار ملف PDF')
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold">رجوع إلى الصفحة الرئيسية</span>
          </Link>
          <h1 className="text-4xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
            قارئ PDF
          </h1>

          {!pdfFile ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
              <p className="text-xl mb-4 text-gray-700 dark:text-gray-300">
                قم برفع ملف PDF للمصحف
              </p>
              <label className="cursor-pointer inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                اختر ملف PDF
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                أو ضع ملف PDF في مجلد public باسم quran.pdf
              </p>
            </div>
          ) : (
            <PDFViewer file={pdfFile} />
          )}
        </div>
      </main>
    </>
  )
}

