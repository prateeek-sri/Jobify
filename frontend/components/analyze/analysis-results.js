"use client"

import { useState } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, AlertTriangle, Lightbulb, ChevronRight, CheckCircle2, ArrowLeft, Download, Share2, FileText, Briefcase, Award } from "lucide-react"

export function AnalysisResults({ data, onReset }) {
  const [showDetailedMetrics, setShowDetailedMetrics] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        type: 'ATS_MATCH',
        matchScore: data.matchScore,
        atsScore: data.matchScore,
        missingSkills: data.missingSkills,
        suggestedImprovements: data.suggestedImprovements,
        verdict: data.verdict,
        resumeSummary: data.resumeSummary || data.explanation
      };
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyze/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  if (!data) {
    return (
      <Card className="border-border/50 h-full flex flex-col justify-center min-h-[400px]">
        <CardHeader className="text-center">
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Results will appear here after analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Target className="size-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Upload a resume and job description to begin
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const CircularScore = ({ score }) => {
    const size = 120;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const scoreVal = score || 0;
    const strokeDashoffset = circumference - (scoreVal / 100) * circumference;

    let color = "#ef4444"; // red-500
    if (scoreVal >= 80) color = "#16a34a"; // green-600
    else if (scoreVal >= 60) color = "#eab308"; // yellow-500

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg height={size} width={size} className="transform -rotate-90">
          <circle
            stroke="currentColor"
            className="text-gray-100 dark:text-gray-800"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" }}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center mt-0.5">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight">{scoreVal}</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold mt-1">
            Out of 100
          </span>
        </div>
      </div>
    );
  };

  const formattedDate = new Date(data.timestamp || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Card */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-500 font-semibold mb-2">
                <Target className="size-5" />
                <span>Overall ATS Score</span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Your resume is performing better than {data.matchScore}% of candidates in the technology sector. Address the missing keywords below to reach 95+.
              </p>
              <div className="flex gap-3 pt-2">
                <Button onClick={onReset} variant="default" className="bg-green-700 hover:bg-green-800 text-white shadow-sm">
                  <ArrowLeft className="mr-2 size-4" /> Scan Again
                </Button>
                <Button variant="outline" onClick={handleSave} disabled={isSaving || saved}>
                  {saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Analysis'}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <CircularScore score={data.matchScore} />
              <div className="mt-2 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-800/30 flex items-center gap-1">
                <Target className="size-3" />
                {data.matchScore >= 80 ? 'Excellent Match' : data.matchScore >= 60 ? 'Good Match' : 'Needs Improvement'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Missing Keywords Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="size-5 text-red-500" />
            Missing Keywords
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <p className="text-sm text-muted-foreground mb-4">
            The following critical skills were not detected by the parser for the role profile.
          </p>
          {data.missingSkills && data.missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {data.missingSkills.map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-red-50/50 hover:bg-red-50 text-red-600 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/50 py-1.5 px-3 text-sm font-normal transition-colors"
                >
                  <span className="mr-1.5 opacity-60">+</span> {skill}
                </Badge>
              ))}
            </div>
          ) : (
             <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <CheckCircle2 className="size-5" />
                <span className="text-sm font-medium">Great job! No major keywords missing.</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Suggested Improvements Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="size-5 text-blue-500" />
            Suggested Improvements
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5 space-y-6">
          {data.suggestedImprovements && data.suggestedImprovements.length > 0 ? (
            data.suggestedImprovements.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-full border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                  <Briefcase className="size-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground/90">{item.area}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.suggestion}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex gap-4 items-start">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-full border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <Award className="size-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground/90">General Optimization</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Consider reviewing standard resume best practices. Ensure your experience is quantified with measurable achievements.
                </p>
              </div>
            </div>
          )}

          {/* AI Verdict */}
          {data.verdict && (
            <div className="flex gap-4 items-start mt-6 pt-6 border-t border-dashed">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 rounded-full border border-purple-100 dark:border-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <Target className="size-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground/90">Recruiter Verdict</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.verdict}
                  </p>
                </div>
            </div>
          )}

          {/* Detailed Metrics / Resume Summary */}
          {showDetailedMetrics && (
            <div className="mt-6 pt-6 border-t border-dashed animate-in fade-in duration-300">
               <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                 <FileText className="size-5 text-indigo-500" />
                 Resume Summary
               </div>
               <div className="bg-muted/30 p-4 rounded-lg border text-sm text-muted-foreground leading-relaxed">
                 {data.resumeSummary || data.explanation || "No summary generated for this profile."}
               </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 mt-4 border-t">
            <span className="text-xs text-muted-foreground">
              Analysis generated on {formattedDate} • v4.2 Engine
            </span>
            <Button 
              variant="ghost" 
              className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 h-8 px-3"
              onClick={() => setShowDetailedMetrics(!showDetailedMetrics)}
            >
              {showDetailedMetrics ? 'Hide Detailed Metrics' : 'View Detailed Metrics'} 
              <ChevronRight className={`size-4 ml-1 transition-transform ${showDetailedMetrics ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}