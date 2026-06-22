"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, 
  Loader2, AlertTriangle, CheckCircle, TrendingUp, FileText, Search
} from "lucide-react"

// 🔥 Accept the refreshTrigger prop
export function ResumePreview({ refreshTrigger = 0 }) {
  const [resumeData, setResumeData] = useState(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
        // 🔥 CLEAN REQUEST: No x-user-id, just credentials
        // UPDATED: Using Environment Variable
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/profile`, {
            method: 'GET',
            credentials: 'include' // Sends JWT Cookie
        })
        
        if (res.ok) {
            const data = await res.json()
            setResumeData(data)
            setIsUploaded(true)
        } else {
            // If error, reset state
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
    // 🔥 LOGIC: 
    // If refreshTrigger is 0 (Default/Refresh), do NOTHING. Keep empty.
    // If refreshTrigger is > 0 (After Upload), fetch data.
    if (refreshTrigger > 0) {
        fetchProfile()
    }
  }, [refreshTrigger])

  // 1. Loading State
  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* ATS Circle & Score lines */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-900/30 rounded-xl">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>

          <div className="space-y-4">
            {/* Keywords */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-14 rounded" />
              </div>
            </div>
            
            {/* Experience block */}
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
               <CheckCircle className="size-5" />
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

  const getScoreColor = (score) => {
      if (score >= 80) return "text-green-500";
      if (score >= 60) return "text-yellow-500";
      return "text-red-500";
  }

  return (
    <div className="space-y-6">
    
    <Card className="border-border/50 bg-blue-50/50 dark:bg-blue-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-blue-600" /> ATS Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Overall ATS Score</p>
                <div className={`text-4xl font-bold ${getScoreColor(resumeData.atsScore || 0)}`}>
                    {resumeData.atsScore || 0}/100
                </div>
            </div>
            <div className="size-16 rounded-full border-4 border-muted flex items-center justify-center relative bg-background">
                <span className="text-sm font-bold">{resumeData.atsScore || 0}%</span>
            </div>
        </div>

        <Separator />

        {resumeData.missingKeywords && resumeData.missingKeywords.length > 0 && (
            <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-red-500">
                    <AlertTriangle className="size-4" /> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                    {resumeData.missingKeywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="border-red-200 text-red-600 bg-red-50 dark:bg-red-900/10">
                            {keyword}
                        </Badge>
                    ))}
                </div>
            </div>
        )}

        {resumeData.improvements && resumeData.improvements.length > 0 && (
            <div>
                 <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-blue-500">
                    <CheckCircle className="size-4" /> Suggested Improvements
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {resumeData.improvements.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                    ))}
                </ul>
            </div>
        )}

      </CardContent>
    </Card>

    {/* Resume Details Card */}
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
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

        {resumeData.summary && (
            <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="size-4" /> Professional Summary
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {resumeData.summary}
            </p>
            </div>
        )}
        
        <Separator />

        {resumeData.experience && (
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

        {resumeData.projects && (
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

        {resumeData.education && (
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
    </div>
  )
}