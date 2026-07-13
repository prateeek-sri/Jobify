"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, 
  Loader2, AlertTriangle, CheckCircle2, TrendingUp, FileText, Search, Target, Lightbulb, ChevronRight, ArrowLeft
} from "lucide-react"

export function ResumePreview({ refreshTrigger = 0, onDataLoad, onReset }) {
  const [resumeData, setResumeData] = useState(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDetailedMetrics, setShowDetailedMetrics] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveAnalysis = async () => {
    setIsSaving(true);
    try {
      const payload = {
        type: 'RESUME',
        atsScore: resumeData.atsScore || 0,
        missingKeywords: resumeData.missingKeywords,
        improvements: resumeData.improvements,
        resumeSummary: resumeData.summary
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

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/profile`, {
            method: 'GET',
            credentials: 'include'
        })
        
        if (res.ok) {
            const data = await res.json()
            setResumeData(data)
            setIsUploaded(true)
            if(onDataLoad) onDataLoad(true)
        } else {
            setIsUploaded(false)
            setResumeData(null)
        }
    } catch (error) {
        console.error("Error fetching profile:", error)
        setIsUploaded(false)
        setResumeData(null)
    } finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    if (refreshTrigger > 0) {
        fetchProfile()
    }
  }, [refreshTrigger])

  const handleReset = () => {
    setIsUploaded(false);
    setResumeData(null);
    setShowDetailedMetrics(false);
    setSaved(false);
    if(onReset) onReset();
  }

  // 1. Loading State
  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-900/30 rounded-xl">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-14 rounded" />
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-border">
              <Skeleton className="h-5 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 2. Empty State (Default)
  if (!isUploaded || !resumeData) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-zinc-800 h-full">
        <h3 className="text-xl font-bold text-black dark:text-white mb-6">Resume Intelligence Preview</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
               <TrendingUp className="size-5" />
             </div>
             <h4 className="font-semibold text-black dark:text-white mb-1">ATS Score Calculation</h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Progress visualization and analysis on your resume.</p>
             <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden flex">
               <div className="bg-blue-600 h-full w-[60%]"></div>
             </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
               <AlertTriangle className="size-5" />
             </div>
             <h4 className="font-semibold text-black dark:text-white mb-1">Missing Keywords</h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Example keywords will appear here.</p>
             <div className="flex flex-wrap gap-1">
                <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">keywords</span>
                <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">react</span>
                <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">teams</span>
                <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">web</span>
             </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
               <FileText className="size-5" />
             </div>
             <h4 className="font-semibold text-black dark:text-white mb-1">Parsed Profile</h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Micro-interactions on hover.</p>
             <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700"></div>
               <div className="space-y-1">
                 <div className="w-16 h-2 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                 <div className="w-24 h-2 bg-gray-200 dark:bg-zinc-700 rounded"></div>
               </div>
             </div>
             <p className="text-[10px] font-semibold text-black dark:text-white mb-1">Summary</p>
             <div className="space-y-1">
               <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-700 rounded"></div>
               <div className="w-4/5 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded"></div>
             </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
               <CheckCircle2 className="size-5" />
             </div>
             <h4 className="font-semibold text-black dark:text-white mb-1">Improvement Tips</h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Action-interactions on hover.</p>
             <ul className="text-[10px] text-gray-500 dark:text-gray-400 list-disc pl-3 space-y-1">
               <li>Remove any problem with flow and errors.</li>
               <li>Improve all keyword placement.</li>
               <li>Actionable insights on your side.</li>
             </ul>
          </div>
        </div>
      </div>
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

  const scoreVal = resumeData.atsScore || 0;
  const formattedDate = new Date().toLocaleDateString('en-US', {
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
                Your resume scored {scoreVal} out of 100. Address the missing keywords and suggested improvements below to reach 95+.
              </p>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleReset} variant="default" className="bg-green-700 hover:bg-green-800 text-white shadow-sm">
                  <ArrowLeft className="mr-2 size-4" /> Scan Again
                </Button>
                <Button variant="outline" onClick={handleSaveAnalysis} disabled={isSaving || saved}>
                  {saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Analysis'}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <CircularScore score={scoreVal} />
              <div className="mt-2 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-800/30 flex items-center gap-1">
                <Target className="size-3" />
                {scoreVal >= 80 ? 'Excellent Match' : scoreVal >= 60 ? 'Good Match' : 'Needs Improvement'}
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
          {resumeData.missingKeywords && resumeData.missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {resumeData.missingKeywords.map((skill, idx) => (
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
          {resumeData.improvements && resumeData.improvements.length > 0 ? (
            resumeData.improvements.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-full border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                  <Briefcase className="size-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground/90">Actionable Feedback</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item}
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
      
      {/* Detailed Metrics / Resume Summary */}
      {showDetailedMetrics && (
        <Card className="border-border/50 animate-in fade-in duration-300">
          <CardHeader>
            <CardTitle>Parsed Resume Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resume Summary */}
            {resumeData.summary && (
               <div>
                 <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                   <FileText className="size-5 text-indigo-500" />
                   Resume Summary
                 </div>
                 <div className="bg-muted/30 p-4 rounded-lg border text-sm text-muted-foreground leading-relaxed">
                   {resumeData.summary || "No summary generated for this profile."}
                 </div>
               </div>
            )}
            
            <Separator />
            
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-3">{resumeData.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4" />
                  {resumeData.email}
                </div>
                {resumeData.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4" />
                    {resumeData.phone}
                    </div>
                )}
                {resumeData.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {resumeData.location}
                    </div>
                )}
              </div>
            </div>

            <Separator />

            {resumeData.experience && resumeData.experience.length > 0 && (
                <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Briefcase className="size-4" /> Experience
                </h4>
                <div className="space-y-4">
                    {resumeData.experience.map((exp, idx) => (
                    <div key={idx}>
                        <div className="font-medium">{exp.title}</div>
                        <div className="text-sm text-muted-foreground">{exp.company}</div>
                        <div className="text-xs text-muted-foreground mb-2">{exp.duration}</div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                        </p>
                    </div>
                    ))}
                </div>
                </div>
            )}

            <Separator />

            {resumeData.projects && resumeData.projects.length > 0 && (
                <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="size-4" /> Projects
                </h4>
                <div className="space-y-4">
                    {resumeData.projects.map((project, idx) => (
                    <div key={idx}>
                        <div className="font-medium">{project.name}</div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                        {project.technologies && project.technologies.map((tech) => (
                            <span key={tech} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {tech}
                            </span>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}

            <Separator />

            {resumeData.education && resumeData.education.length > 0 && (
                <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="size-4" /> Education
                </h4>
                {resumeData.education.map((edu, idx) => (
                    <div key={idx}>
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-sm text-muted-foreground">{edu.school}</div>
                    <div className="text-xs text-muted-foreground">{edu.year}</div>
                    </div>
                ))}
                </div>
            )}

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills && resumeData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}