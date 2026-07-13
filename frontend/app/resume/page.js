"use client"

import { useState } from "react"
import { ResumeUpload } from "@/components/resume/resume-upload"
import { ResumePreview } from "@/components/resume/resume-preview"

export default function ResumePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isUploaded, setIsUploaded] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0a192f] dark:text-white tracking-tight">Professional ATS Analysis Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
              AI-powered job application and resume analysis platform for job seekers
            </p>
          </div>

          <div className={`grid gap-6 ${isUploaded ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
            {!isUploaded && (
              <ResumeUpload onUploadSuccess={() => setRefreshTrigger((prev) => prev + 1)} />
            )}
            
            <ResumePreview 
              refreshTrigger={refreshTrigger} 
              onDataLoad={(hasData) => setIsUploaded(hasData)} 
              onReset={() => setIsUploaded(false)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}