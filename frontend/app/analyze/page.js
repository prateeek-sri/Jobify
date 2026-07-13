"use client" // <--- Make sure this is here

import { useState } from "react"
import { AnalysisForm } from "@/components/analyze/analysis-form"
import { AnalysisResults } from "@/components/analyze/analysis-results"

export default function AnalyzePage() {
  // This state holds the result. When you refresh, this becomes null automatically.
  const [analysisResult, setAnalysisResult] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Resume Matcher</h1>
            <p className="text-muted-foreground text-lg">
              Analyze how well your resume matches a job description
            </p>
          </div>

          {!analysisResult ? (
            <div className="grid lg:grid-cols-2 gap-6">
              <AnalysisForm onAnalysisComplete={setAnalysisResult} />
              <AnalysisResults data={null} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <AnalysisResults data={analysisResult} onReset={() => setAnalysisResult(null)} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}