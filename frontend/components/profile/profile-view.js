"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton"
import {
  Mail,
  Phone,
  MapPin,
  Code,
  Edit2,
  Upload,
  X,
  Plus,
  Trash2,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Briefcase,
  GraduationCap,
  Sparkles,
  AlertTriangle,
  Layers,
  Check,
  Target
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function ProfileView() {
  const [profile, setProfile] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      summary: "",
      avatar: "",
      githubUrl: "",
      linkedinUrl: "",
      websiteUrl: "",
      twitterUrl: "",
    },
    skills: {
      technical: [],
    },
    experience: [],
    education: [],
    projects: [],
    resumeUploaded: false,
    atsScore: 0,
    missingKeywords: [],
    improvements: [],
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  
  // Navigation State
  const [activeTab, setActiveTab] = useState("overview")

  // Activity Calendar state
  const [activities, setActivities] = useState([])
  const [savedAnalyses, setSavedAnalyses] = useState([])

  // Lists edit states
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null)
  const [expForm, setExpForm] = useState({ title: "", company: "", duration: "", description: "" })

  const [editingProjectIndex, setEditingProjectIndex] = useState(null)
  const [projForm, setProjForm] = useState({ name: "", description: "", technologies: "" })

  const [editingEducationIndex, setEditingEducationIndex] = useState(null)
  const [eduForm, setEduForm] = useState({ degree: "", school: "", year: "" })

  const [showDefaultAvatars, setShowDefaultAvatars] = useState(false)

  // --- FETCH DATA ---
  useEffect(() => {
    fetchProfile()
    fetchActivities()
    fetchSavedAnalyses()
  }, [])

  const fetchSavedAnalyses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyze/saved`, {
        method: 'GET',
        credentials: 'include'
      })
      if (res.ok) {
        const data = await res.json()
        setSavedAnalyses(data)
      }
    } catch (error) {
      console.error("Failed to fetch saved analyses", error)
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        method: 'GET',
        credentials: 'include' 
      })
      
      if (res.ok) {
        const data = await res.json()
        setProfile({
            personalInfo: {
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                location: data.location || "",
                title: data.experience?.[0]?.title || data.title || "", 
                summary: data.summary || "",
                avatar: data.avatar || "",
                githubUrl: data.githubUrl || "",
                linkedinUrl: data.linkedinUrl || "",
                websiteUrl: data.websiteUrl || "",
                twitterUrl: data.twitterUrl || "",
            },
            skills: {
                technical: data.skills || [],
            },
            experience: data.experience || [],
            education: data.education || [],
            projects: data.projects || [],
            resumeUploaded: data.atsScore > 0 || (data.skills && data.skills.length > 0) || false,
            atsScore: data.atsScore || 0,
            missingKeywords: data.missingKeywords || [],
            improvements: data.improvements || []
        })
      }
    } catch (error) {
      console.error("Failed to fetch profile", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchActivities = async () => {
    try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const user = JSON.parse(storedUser);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/application/history?userId=${user._id || user.id}`);
        if (res.ok) {
            const apps = await res.json();
            if (Array.isArray(apps)) {
                setActivities(apps);
            }
        }
    } catch (err) {
        console.error("Failed to fetch applications activity history", err);
    }
  }

  // --- SAVE DIRECT HELPER ---
  const saveProfileDirect = async (updatedProfile) => {
    setIsSaving(true)
    try {
        const backendPayload = {
            name: updatedProfile.personalInfo.name,
            email: updatedProfile.personalInfo.email,
            phone: updatedProfile.personalInfo.phone,
            location: updatedProfile.personalInfo.location,
            summary: updatedProfile.personalInfo.summary,
            skills: updatedProfile.skills.technical,
            education: updatedProfile.education,
            projects: updatedProfile.projects,
            experience: updatedProfile.experience,
            avatar: updatedProfile.personalInfo.avatar,
            githubUrl: updatedProfile.personalInfo.githubUrl,
            linkedinUrl: updatedProfile.personalInfo.linkedinUrl,
            websiteUrl: updatedProfile.personalInfo.websiteUrl,
            twitterUrl: updatedProfile.personalInfo.twitterUrl,
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(backendPayload)
        })

        if (!res.ok) {
           console.error("Failed to save changes directly")
        }
    } catch (error) {
        console.error("Failed to save changes", error)
    } finally {
        setIsSaving(false)
    }
  }

  // --- PERSONAL INFO SAVE ---
  const savePersonalAndSocials = async () => {
    await saveProfileDirect(profile)
    setEditingSection(null)
  }

  // --- SKILL HANDLERS ---
  const handleSkillAdd = (val) => {
    const trimmed = val.trim()
    if (!trimmed) return
    if (profile.skills.technical.includes(trimmed)) return
    
    const updated = {
      ...profile,
      skills: {
        ...profile.skills,
        technical: [...profile.skills.technical, trimmed]
      }
    }
    setProfile(updated)
    saveProfileDirect(updated)
  }

  const removeSkill = (idx) => {
    const updatedSkills = [...profile.skills.technical]
    updatedSkills.splice(idx, 1)
    
    const updated = {
      ...profile,
      skills: {
        ...profile.skills,
        technical: updatedSkills
      }
    }
    setProfile(updated)
    saveProfileDirect(updated)
  }

  // --- EXPERIENCE EDITORS ---
  const handleAddExperienceClick = () => {
    setExpForm({ title: "", company: "", duration: "", description: "" })
    setEditingExperienceIndex(-1)
  }

  const handleEditExperienceClick = (idx, item) => {
    setExpForm({
      title: item.title || "",
      company: item.company || "",
      duration: item.duration || "",
      description: item.description || ""
    })
    setEditingExperienceIndex(idx)
  }

  const handleSaveExperience = () => {
    if (!expForm.title.trim() || !expForm.company.trim()) {
      alert("Title and Company are required")
      return
    }
    let updatedList = [...profile.experience]
    if (editingExperienceIndex === -1) {
      updatedList.push({ ...expForm })
    } else {
      updatedList[editingExperienceIndex] = { ...expForm }
    }
    const updated = { ...profile, experience: updatedList }
    setProfile(updated)
    saveProfileDirect(updated)
    setEditingExperienceIndex(null)
  }

  const removeExperience = (idx) => {
    const updatedList = [...profile.experience]
    updatedList.splice(idx, 1)
    const updated = { ...profile, experience: updatedList }
    setProfile(updated)
    saveProfileDirect(updated)
  }

  // --- PROJECTS EDITORS ---
  const handleAddProjectClick = () => {
    setProjForm({ name: "", description: "", technologies: "" })
    setEditingProjectIndex(-1)
  }

  const handleEditProjectClick = (idx, item) => {
    setProjForm({
      name: item.name || "",
      description: item.description || "",
      technologies: item.technologies ? item.technologies.join(", ") : ""
    })
    setEditingProjectIndex(idx)
  }

  const handleSaveProject = () => {
    if (!projForm.name.trim()) {
      alert("Project Name is required")
      return
    }
    const techArray = projForm.technologies
      ? projForm.technologies.split(",").map(t => t.trim()).filter(Boolean)
      : []

    let updatedList = [...profile.projects]
    const itemData = {
      name: projForm.name,
      description: projForm.description,
      technologies: techArray
    }
    
    if (editingProjectIndex === -1) {
      updatedList.push(itemData)
    } else {
      updatedList[editingProjectIndex] = itemData
    }
    const updated = { ...profile, projects: updatedList }
    setProfile(updated)
    saveProfileDirect(updated)
    setEditingProjectIndex(null)
  }

  const removeProject = (idx) => {
    const updatedList = [...profile.projects]
    updatedList.splice(idx, 1)
    const updated = { ...profile, projects: updatedList }
    setProfile(updated)
    saveProfileDirect(updated)
  }

  // --- EDUCATION EDITORS ---
  const handleAddEducationClick = () => {
    setEduForm({ degree: "", school: "", year: "" })
    setEditingEducationIndex(-1)
  }

  const handleEditEducationClick = (idx, item) => {
    setEduForm({
      degree: item.degree || "",
      school: item.school || "",
      year: item.year || ""
    })
    setEditingEducationIndex(idx)
  }

  const handleSaveEducation = () => {
    if (!eduForm.degree.trim() || !eduForm.school.trim()) {
      alert("Degree and School are required")
      return
    }
    let updatedList = [...profile.education]
    if (editingEducationIndex === -1) {
      updatedList.push({ ...eduForm })
    } else {
      updatedList[editingEducationIndex] = { ...eduForm }
    }
    const updated = { ...profile, education: updatedList }
    setProfile(updated)
    saveProfileDirect(updated)
    setEditingEducationIndex(null)
  }

  const removeEducation = (idx) => {
    const updatedList = [...profile.education]
    updatedList.splice(idx, 1)
    const updated = { ...profile, education: updatedList }
    setProfile(updated)
    saveProfileDirect(updated)
  }

  // --- AVATAR & RESUME HANDLERS ---
  const handleResumeUpload = async (file) => {
    const formData = new FormData()
    formData.append('resume', file)
    setIsLoading(true);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/upload`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        
        if (res.ok) {
            const data = await res.json()
            const newProfileData = data.profile;
            
            const updated = {
                ...profile,
                personalInfo: {
                    ...profile.personalInfo,
                    name: newProfileData.name || profile.personalInfo.name,
                    email: newProfileData.email || profile.personalInfo.email,
                    phone: newProfileData.phone || profile.personalInfo.phone,
                    location: newProfileData.location || profile.personalInfo.location,
                    summary: newProfileData.summary || profile.personalInfo.summary,
                    title: newProfileData.experience?.[0]?.title || profile.personalInfo.title,
                    avatar: newProfileData.avatar || profile.personalInfo.avatar 
                },
                skills: {
                    ...profile.skills,
                    technical: newProfileData.skills || [],
                },
                experience: newProfileData.experience || profile.experience,
                education: newProfileData.education || profile.education,
                projects: newProfileData.projects || profile.projects,
                atsScore: newProfileData.atsScore || 0,
                missingKeywords: newProfileData.missingKeywords || [],
                improvements: newProfileData.improvements || [],
                resumeUploaded: true
            }
            setProfile(updated)

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const userObj = JSON.parse(storedUser);
                userObj.skills = newProfileData.skills || [];
                localStorage.setItem("user", JSON.stringify(userObj));
            }
        }
    } catch (error) {
        console.error("Upload failed", error)
    } finally {
        setIsLoading(false);
    }
  }

  const handleAvatarUpload = (file) => {
    if (file.size > 2 * 1024 * 1024) {
        alert("File is too big! Please upload an image under 2MB.");
        return;
    }

    const reader = new FileReader()
    reader.onload = async () => {
      const base64Image = reader.result;
      const updated = {
        ...profile,
        personalInfo: {
          ...profile.personalInfo,
          avatar: base64Image,
        }
      }
      setProfile(updated)
      await saveProfileDirect(updated)
    }
    reader.readAsDataURL(file)
  }

  const handleSelectDefaultAvatar = async (src) => {
    const updated = {
      ...profile,
      personalInfo: {
        ...profile.personalInfo,
        avatar: src,
      }
    }
    setProfile(updated)
    await saveProfileDirect(updated)
    setShowDefaultAvatars(false)
  }

  const DEFAULT_AVATARS = [
    '/avatars/avatar.png',
    '/avatars/boy.png',
    '/avatars/bulldog.png',
    '/avatars/duck.png',
    '/avatars/giraffe.png',
    '/avatars/girl.png',
    '/avatars/man.png',
    '/avatars/penguin.png',
    '/avatars/woman.png',
  ]

  // --- CALENDAR DATA COMPUTATION ---
  const activityMap = {}
  activities.forEach(app => {
    if (app.createdAt) {
      const dateStr = app.createdAt.split('T')[0]
      activityMap[dateStr] = (activityMap[dateStr] || 0) + 1
    }
  })

  const days = []
  const today = new Date()
  const startDay = new Date()
  startDay.setDate(today.getDate() - 111 - today.getDay()) // Back 16 weeks, aligned to Sunday

  for (let i = 0; i < 112; i++) {
    const d = new Date(startDay)
    d.setDate(startDay.getDate() + i)
    days.push(d)
  }

  // --- ATS SCORE CIRCLE CALCULATOR ---
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const atsScore = profile.atsScore || 0
  const strokeDashoffset = circumference - (atsScore / 100) * circumference

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Upper Title Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 border-b border-zinc-200 dark:border-zinc-800 mb-8">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Profile Page</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Manage your professional information, stats and pipeline visibility</p>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="file"
              className="hidden"
              id="resumeUploadBtn"
              accept=".pdf"
              onChange={(e) => e.target.files?.[0] && handleResumeUpload(e.target.files[0])}
            />
            <label htmlFor="resumeUploadBtn" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-md">
              <Upload className="size-4" /> {profile.resumeUploaded ? "Update Resume" : "Upload Resume"}
            </label>
          </div>
        </div>

        {/* LeetCode Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar (Bio, Info, Edit, Socials, Navigation) */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden bg-white dark:bg-zinc-900">
              <CardContent className="pt-8 space-y-6">
                
                {/* Avatar and Primary details */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative group">
                    <Avatar className="size-28 border-4 border-white dark:border-zinc-850 shadow-md">
                      {profile.personalInfo.avatar ? (
                        <AvatarImage src={profile.personalInfo.avatar} className="object-cover" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-tr from-blue-500 to-indigo-600 text-white text-3xl font-black">
                          {profile.personalInfo.name
                            ? profile.personalInfo.name.split(" ").map((n) => n[0]).join("").toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <input
                      type="file"
                      id="avatarUploadInput"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])}
                    />

                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 cursor-pointer">
                      <label htmlFor="avatarUploadInput" className="cursor-pointer text-white flex flex-col items-center gap-1">
                        <Upload className="size-4" />
                        <span className="text-[10px] font-medium">Upload</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1 w-full">
                    <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                      {profile.personalInfo.name || "Set Your Name"}
                    </h2>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {profile.personalInfo.title || "Job Title (e.g. Developer)"}
                    </p>
                  </div>
                  
                  {/* Default avatars trigger */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowDefaultAvatars(!showDefaultAvatars)}
                    className="text-xs border-zinc-200 dark:border-zinc-800"
                  >
                    Change Avatar Preset
                  </Button>

                  {/* Preset list popup */}
                  {showDefaultAvatars && (
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-5 gap-2 w-full">
                      {DEFAULT_AVATARS.map(src => (
                        <button
                          key={src}
                          onClick={() => handleSelectDefaultAvatar(src)}
                          className="rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-0.5 hover:scale-110 transition-transform"
                        >
                          <img src={src} alt="avatar option" className="w-full h-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}

                  {profile.personalInfo.summary && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 italic px-4 leading-relaxed">
                      "{profile.personalInfo.summary}"
                    </p>
                  )}
                </div>

                {/* Edit Form Toggle */}
                {editingSection === "personal" ? (
                  <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="space-y-2.5">
                      <Input
                        placeholder="Full Name"
                        value={profile.personalInfo.name}
                        onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, name: e.target.value } })}
                        className="h-9 text-sm"
                      />
                      <Input
                        placeholder="Job Title"
                        value={profile.personalInfo.title}
                        onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, title: e.target.value } })}
                        className="h-9 text-sm"
                      />
                      <Input
                        placeholder="Email Address"
                        value={profile.personalInfo.email}
                        onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, email: e.target.value } })}
                        className="h-9 text-sm"
                      />
                      <Input
                        placeholder="Phone Number"
                        value={profile.personalInfo.phone}
                        onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, phone: e.target.value } })}
                        className="h-9 text-sm"
                      />
                      <Input
                        placeholder="Location"
                        value={profile.personalInfo.location}
                        onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, location: e.target.value } })}
                        className="h-9 text-sm"
                      />
                      <Textarea
                        placeholder="Short summary/bio"
                        value={profile.personalInfo.summary}
                        onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, summary: e.target.value } })}
                        className="text-sm min-h-[60px]"
                      />
                      
                      {/* Social Inputs */}
                      <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs font-bold text-zinc-400">Social Links</p>
                        <Input
                          placeholder="GitHub Profile URL"
                          value={profile.personalInfo.githubUrl}
                          onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, githubUrl: e.target.value } })}
                          className="h-8 text-xs"
                        />
                        <Input
                          placeholder="LinkedIn Profile URL"
                          value={profile.personalInfo.linkedinUrl}
                          onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, linkedinUrl: e.target.value } })}
                          className="h-8 text-xs"
                        />
                        <Input
                          placeholder="Portfolio Website URL"
                          value={profile.personalInfo.websiteUrl}
                          onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, websiteUrl: e.target.value } })}
                          className="h-8 text-xs"
                        />
                        <Input
                          placeholder="Twitter Profile URL"
                          value={profile.personalInfo.twitterUrl}
                          onChange={(e) => setProfile({ ...profile, personalInfo: { ...profile.personalInfo, twitterUrl: e.target.value } })}
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => setEditingSection(null)} variant="outline" size="sm" className="flex-1 text-xs">
                        Cancel
                      </Button>
                      <Button onClick={savePersonalAndSocials} size="sm" className="flex-1 text-xs bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                        Save Info
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 pt-4 border-t border-zinc-150 dark:border-zinc-800">
                    
                    {/* Contact detail rows */}
                    <div className="space-y-3.5 text-sm text-zinc-600 dark:text-zinc-300">
                      {profile.personalInfo.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="size-4 text-zinc-400 shrink-0" />
                          <span>{profile.personalInfo.location}</span>
                        </div>
                      )}
                      {profile.personalInfo.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="size-4 text-zinc-400 shrink-0" />
                          <span className="truncate">{profile.personalInfo.email}</span>
                        </div>
                      )}
                      {profile.personalInfo.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="size-4 text-zinc-400 shrink-0" />
                          <span>{profile.personalInfo.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Social links row */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      {profile.personalInfo.githubUrl ? (
                        <a href={profile.personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
                          <Github className="size-5" />
                        </a>
                      ) : <span className="p-2 text-zinc-300 dark:text-zinc-700"><Github className="size-5" /></span>}

                      {profile.personalInfo.linkedinUrl ? (
                        <a href={profile.personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-blue-600 transition-colors">
                          <Linkedin className="size-5" />
                        </a>
                      ) : <span className="p-2 text-zinc-300 dark:text-zinc-700"><Linkedin className="size-5" /></span>}

                      {profile.personalInfo.websiteUrl ? (
                        <a href={profile.personalInfo.websiteUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-emerald-600 transition-colors">
                          <Globe className="size-5" />
                        </a>
                      ) : <span className="p-2 text-zinc-300 dark:text-zinc-700"><Globe className="size-5" /></span>}

                      {profile.personalInfo.twitterUrl ? (
                        <a href={profile.personalInfo.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sky-500 transition-colors">
                          <Twitter className="size-5" />
                        </a>
                      ) : <span className="p-2 text-zinc-300 dark:text-zinc-700"><Twitter className="size-5" /></span>}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full text-xs font-semibold"
                      onClick={() => setEditingSection("personal")}
                    >
                      <Edit2 className="size-3 mr-1.5" /> Edit Profile & Socials
                    </Button>
                  </div>
                )}

                {/* Navigation Tabs - Swaps Right Side view */}
                <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 space-y-1">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === "overview"
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-emerald-500" />
                      <span>Overview (ATS & Stats)</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === "experience"
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="size-4 text-blue-500" />
                      <span>Work Experience</span>
                    </div>
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">
                      {profile.experience?.length || 0}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === "skills"
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Code className="size-4 text-purple-500" />
                      <span>Technical Skills</span>
                    </div>
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">
                      {profile.skills.technical?.length || 0}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === "projects"
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Code className="size-4 text-purple-500" />
                      <span>Projects</span>
                    </div>
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">
                      {profile.projects?.length || 0}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("education")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === "education"
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="size-4 text-emerald-500" />
                      <span>Education</span>
                    </div>
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">
                      {profile.education?.length || 0}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("saved")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === "saved"
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Target className="size-4 text-rose-500" />
                      <span>Saved Analyses</span>
                    </div>
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">
                      {savedAnalyses.length}
                    </span>
                  </button>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Statistics or swapable editors list */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* VIEW 1: Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* ATS Strength Card (LeetCode stats style) */}
                <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
                      
                      {/* SVG Circle progress */}
                      <div className="flex flex-col items-center justify-center md:border-r border-zinc-150 dark:border-zinc-800 md:pr-8 py-2 shrink-0">
                        <div className="relative flex items-center justify-center size-28">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="56"
                              cy="56"
                              r={radius}
                              className="stroke-zinc-100 dark:stroke-zinc-800"
                              strokeWidth="8"
                              fill="transparent"
                            />
                            <circle
                              cx="56"
                              cy="56"
                              r={radius}
                              className="stroke-emerald-500 dark:stroke-emerald-400 transition-all duration-700"
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-zinc-900 dark:text-white leading-none">{atsScore}</span>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-extrabold uppercase mt-1">ATS Score</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-3 text-center">
                          {atsScore >= 80 ? "🔥 Excellent Match" : atsScore >= 60 ? "📈 Good Match" : "⚠️ Needs Optimization"}
                        </span>
                      </div>

                      {/* Keywords & Suggestions Breakdown */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                          <Sparkles className="size-4 text-amber-500 fill-amber-500" />
                          <span className="font-extrabold text-base">ATS Keyword intelligence</span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-bold text-red-500 mb-1.5 flex items-center gap-1">
                              <AlertTriangle className="size-3.5" /> Missing Keywords ({profile.missingKeywords.length})
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {profile.missingKeywords.length > 0 ? (
                                profile.missingKeywords.map((kw, i) => (
                                  <span key={i} className="text-[10px] font-semibold bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded dark:bg-red-950/20 dark:text-red-400 dark:border-red-950/50">
                                    {kw}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-zinc-400 dark:text-zinc-500 italic">No missing keywords detected</span>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 mb-1.5">Improvement Recommendations</p>
                            <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1 list-disc pl-4 leading-relaxed">
                              {profile.improvements.length > 0 ? (
                                profile.improvements.slice(0, 3).map((imp, i) => (
                                  <li key={i}>{imp}</li>
                                ))
                              ) : (
                                <li className="list-none text-zinc-400 dark:text-zinc-500 italic pl-0">Your profile looks highly optimized!</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>

                {/* Pipeline Activity Grid (Leetcode contribution calendar style) */}
                <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-zinc-850 dark:text-zinc-250 flex items-center gap-1.5">
                        <Layers className="size-4 text-green-500" strokeWidth={2} /> Pipeline Activity
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {activities.length} total events tracked
                      </span>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="flex gap-1 overflow-x-auto pb-2 select-none justify-start">
                        {[...Array(16)].map((_, colIdx) => (
                          <div key={colIdx} className="flex flex-col gap-1 shrink-0">
                            {[...Array(7)].map((_, rowIdx) => {
                              const dayIndex = colIdx * 7 + rowIdx
                              const date = days[dayIndex]
                              if (!date) return null
                              
                              const dateStr = date.toISOString().split('T')[0]
                              const count = activityMap[dateStr] || 0
                              
                              let bgClass = "bg-zinc-100 dark:bg-zinc-800"
                              if (count > 0 && count <= 2) bgClass = "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800"
                              if (count > 2 && count <= 4) bgClass = "bg-emerald-300 dark:bg-emerald-700/60 text-emerald-900"
                              if (count > 4) bgClass = "bg-emerald-500 dark:bg-emerald-500 text-white"

                              return (
                                <div
                                  key={rowIdx}
                                  title={`${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${count} application activities`}
                                  className={`w-3.5 h-3.5 rounded-sm cursor-pointer transition-transform duration-200 hover:scale-125 ${bgClass}`}
                                />
                              )
                            })}
                          </div>
                        ))}
                      </div>
                      
                      {/* Legend */}
                      <div className="flex items-center justify-end gap-1.5 text-[10px] text-zinc-400 select-none">
                        <span>Less</span>
                        <div className="w-2.5 h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-sm" />
                        <div className="w-2.5 h-2.5 bg-emerald-150 dark:bg-emerald-950/40 rounded-sm" />
                        <div className="w-2.5 h-2.5 bg-emerald-300 dark:bg-emerald-700/60 rounded-sm" />
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" />
                        <span>More</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* VIEW 2: Experience Tab */}
            {activeTab === "experience" && (
              <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900">
                <CardHeader className="py-5 flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-4.5 text-blue-500" />
                    <CardTitle className="text-lg font-extrabold text-zinc-900 dark:text-white">Work Experience</CardTitle>
                  </div>
                  {editingExperienceIndex === null && (
                    <Button onClick={handleAddExperienceClick} size="sm" variant="ghost" className="h-8 px-2">
                      <Plus className="size-4 text-blue-500" /> Add New
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {editingExperienceIndex === -1 && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                      <p className="text-xs font-bold text-zinc-500">Add Experience</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          placeholder="Job Title (e.g. Frontend Developer)"
                          value={expForm.title}
                          onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                          className="h-9"
                        />
                        <Input
                          placeholder="Company"
                          value={expForm.company}
                          onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                          className="h-9"
                        />
                      </div>
                      <Input
                        placeholder="Duration (e.g. 2024 - Present)"
                        value={expForm.duration}
                        onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                        className="h-9"
                      />
                      <Textarea
                        placeholder="Description/Key accomplishments"
                        value={expForm.description}
                        onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                        className="min-h-[80px]"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button onClick={() => setEditingExperienceIndex(null)} variant="outline" size="sm">Cancel</Button>
                        <Button onClick={handleSaveExperience} size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">Save</Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {profile.experience && profile.experience.length > 0 ? (
                      profile.experience.map((item, idx) => (
                        <div key={idx} className="relative group p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 rounded-xl border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50 transition-all">
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditExperienceClick(idx, item)} className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-500 dark:text-zinc-400">
                              <Edit2 className="size-3.5" />
                            </button>
                            <button onClick={() => removeExperience(idx)} className="p-1.5 rounded-md border border-red-200 dark:border-red-900 bg-white dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>

                          {editingExperienceIndex === idx ? (
                            <div className="space-y-3 pt-2">
                              <p className="text-xs font-bold text-zinc-500">Edit Experience</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Input
                                  placeholder="Job Title"
                                  value={expForm.title}
                                  onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                                  className="h-9"
                                />
                                <Input
                                  placeholder="Company"
                                  value={expForm.company}
                                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                                  className="h-9"
                                />
                              </div>
                              <Input
                                  placeholder="Duration"
                                  value={expForm.duration}
                                  onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                                  className="h-9"
                                />
                              <Textarea
                                placeholder="Description"
                                value={expForm.description}
                                onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                                className="min-h-[80px]"
                              />
                              <div className="flex gap-2 justify-end">
                                <Button onClick={() => setEditingExperienceIndex(null)} variant="outline" size="sm">Cancel</Button>
                                <Button onClick={handleSaveExperience} size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">Save</Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1.5 pr-16">
                              <h4 className="font-extrabold text-zinc-900 dark:text-white text-base">{item.title}</h4>
                              <div className="flex items-center gap-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                                <span>{item.company}</span>
                                <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                                <span className="text-xs font-medium">{item.duration}</span>
                              </div>
                              {item.description && (
                                <p className="text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed mt-2 pl-3 border-l-2 border-zinc-200 dark:border-zinc-800">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-400 dark:text-zinc-500 italic text-center py-4">No work experience listed yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* VIEW 3: Technical Skills Tab */}
            {activeTab === "skills" && (
              <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900">
                <CardHeader className="py-5 flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Code className="size-4.5 text-purple-500" />
                    <CardTitle className="text-lg font-extrabold text-zinc-900 dark:text-white">Technical Skills</CardTitle>
                  </div>
                  <AddSkillButton onAdd={handleSkillAdd} />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.technical && profile.skills.technical.length > 0 ? (
                      profile.skills.technical.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-50 dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-250 dark:border-zinc-800 rounded-full text-sm text-zinc-700 dark:text-zinc-300 transition-colors">
                          <span>{skill}</span>
                          <button onClick={() => removeSkill(idx)} className="text-zinc-400 hover:text-red-500 rounded-full p-0.5 transition-colors">
                            <X className="size-3" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-400 dark:text-zinc-500 italic text-center py-4 w-full">No technical skills added yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* VIEW 4: Projects Tab */}
            {activeTab === "projects" && (
              <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900">
                <CardHeader className="py-5 flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Code className="size-4.5 text-purple-500" />
                    <CardTitle className="text-lg font-extrabold text-zinc-900 dark:text-white">Projects</CardTitle>
                  </div>
                  {editingProjectIndex === null && (
                    <Button onClick={handleAddProjectClick} size="sm" variant="ghost" className="h-8 px-2">
                      <Plus className="size-4 text-purple-500" /> Add New
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {editingProjectIndex === -1 && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-855 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                      <p className="text-xs font-bold text-zinc-500">Add Project</p>
                      <Input
                        placeholder="Project Name (e.g. E-Commerce App)"
                        value={projForm.name}
                        onChange={(e) => setProjForm({ ...projForm, name: e.target.value })}
                        className="h-9"
                      />
                      <Textarea
                        placeholder="Project Description"
                        value={projForm.description}
                        onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                        className="min-h-[80px]"
                      />
                      <Input
                        placeholder="Technologies (comma-separated, e.g. React, Node.js)"
                        value={projForm.technologies}
                        onChange={(e) => setProjForm({ ...projForm, technologies: e.target.value })}
                        className="h-9"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button onClick={() => setEditingProjectIndex(null)} variant="outline" size="sm">Cancel</Button>
                        <Button onClick={handleSaveProject} size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">Save</Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {profile.projects && profile.projects.length > 0 ? (
                      profile.projects.map((item, idx) => (
                        <div key={idx} className="relative group p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 rounded-xl border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50 transition-all">
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditProjectClick(idx, item)} className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-500 dark:text-zinc-400">
                              <Edit2 className="size-3.5" />
                            </button>
                            <button onClick={() => removeProject(idx)} className="p-1.5 rounded-md border border-red-200 dark:border-red-900 bg-white dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-955/20 text-red-500">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>

                          {editingProjectIndex === idx ? (
                            <div className="space-y-3 pt-2">
                              <p className="text-xs font-bold text-zinc-500">Edit Project</p>
                              <Input
                                placeholder="Project Name"
                                value={projForm.name}
                                onChange={(e) => setProjForm({ ...projForm, name: e.target.value })}
                                className="h-9"
                              />
                              <Textarea
                                placeholder="Project Description"
                                value={projForm.description}
                                onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                                className="min-h-[80px]"
                              />
                              <Input
                                placeholder="Technologies (comma-separated)"
                                value={projForm.technologies}
                                onChange={(e) => setProjForm({ ...projForm, technologies: e.target.value })}
                                className="h-9"
                              />
                              <div className="flex gap-2 justify-end">
                                <Button onClick={() => setEditingProjectIndex(null)} variant="outline" size="sm">Cancel</Button>
                                <Button onClick={handleSaveProject} size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">Save</Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1.5 pr-16">
                              <h4 className="font-extrabold text-zinc-900 dark:text-white text-base">{item.name}</h4>
                              {item.description && (
                                <p className="text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                              {item.technologies && item.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1.5">
                                  {item.technologies.map((tech) => (
                                    <span key={tech} className="text-[10px] font-semibold bg-zinc-50 dark:bg-zinc-805 border border-zinc-250 dark:border-zinc-750 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-400 dark:text-zinc-500 italic text-center py-4">No projects listed yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* VIEW 5: Education Tab */}
            {activeTab === "education" && (
              <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900">
                <CardHeader className="py-5 flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-4.5 text-emerald-500" />
                    <CardTitle className="text-lg font-extrabold text-zinc-900 dark:text-white">Education</CardTitle>
                  </div>
                  {editingEducationIndex === null && (
                    <Button onClick={handleAddEducationClick} size="sm" variant="ghost" className="h-8 px-2">
                      <Plus className="size-4 text-emerald-500" /> Add New
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {editingEducationIndex === -1 && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                      <p className="text-xs font-bold text-zinc-500">Add Education</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          placeholder="Degree (e.g. B.S. Computer Science)"
                          value={eduForm.degree}
                          onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                          className="h-9"
                        />
                        <Input
                          placeholder="School/University"
                          value={eduForm.school}
                          onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })}
                          className="h-9"
                        />
                      </div>
                      <Input
                        placeholder="Year (e.g. 2020 - 2024)"
                        value={eduForm.year}
                        onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                        className="h-9"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button onClick={() => setEditingEducationIndex(null)} variant="outline" size="sm">Cancel</Button>
                        <Button onClick={handleSaveEducation} size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">Save</Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {profile.education && profile.education.length > 0 ? (
                      profile.education.map((item, idx) => (
                        <div key={idx} className="relative group p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 rounded-xl border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50 transition-all">
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditEducationClick(idx, item)} className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-500 dark:text-zinc-400">
                              <Edit2 className="size-3.5" />
                            </button>
                            <button onClick={() => removeEducation(idx)} className="p-1.5 rounded-md border border-red-200 dark:border-red-900 bg-white dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-955/20 text-red-500">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>

                          {editingEducationIndex === idx ? (
                            <div className="space-y-3 pt-2">
                              <p className="text-xs font-bold text-zinc-500">Edit Education</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Input
                                  placeholder="Degree"
                                  value={eduForm.degree}
                                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                                  className="h-9"
                                />
                                <Input
                                  placeholder="School"
                                  value={eduForm.school}
                                  onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })}
                                  className="h-9"
                                />
                              </div>
                              <Input
                                placeholder="Year"
                                value={eduForm.year}
                                onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                                className="h-9"
                              />
                              <div className="flex gap-2 justify-end">
                                <Button onClick={() => setEditingEducationIndex(null)} variant="outline" size="sm">Cancel</Button>
                                <Button onClick={handleSaveEducation} size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">Save</Button>
                              </div>
                            </div>
                          ) : (
                            <div className="pr-16 space-y-1">
                              <h4 className="font-extrabold text-zinc-900 dark:text-white text-base">{item.degree}</h4>
                              <div className="flex items-center gap-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                                <span>{item.school}</span>
                                <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                                <span className="text-xs font-medium">{item.year}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-400 dark:text-zinc-500 italic text-center py-4">No education information listed yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* VIEW 6: Saved Analyses Tab */}
            {activeTab === "saved" && (
              <Card className="border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900">
                <CardHeader className="py-5 flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Target className="size-4.5 text-rose-500" />
                    <CardTitle className="text-lg font-extrabold text-zinc-900 dark:text-white">Saved Analyses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {savedAnalyses && savedAnalyses.length > 0 ? (
                      savedAnalyses.map((analysis, idx) => (
                        <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={analysis.type === 'RESUME' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                                  {analysis.type === 'RESUME' ? 'Resume Scan' : 'ATS Match'}
                                </Badge>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                  {new Date(analysis.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>
                              <h4 className="font-bold text-zinc-900 dark:text-white text-base">
                                Score: <span className={analysis.atsScore >= 80 ? 'text-emerald-500' : analysis.atsScore >= 60 ? 'text-amber-500' : 'text-red-500'}>{analysis.atsScore}/100</span>
                              </h4>
                            </div>
                          </div>
                          
                          {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                            <div className="mb-3">
                              <p className="text-[11px] font-bold text-zinc-500 uppercase mb-1.5">Missing Keywords</p>
                              <div className="flex flex-wrap gap-1.5">
                                {analysis.missingKeywords.slice(0, 5).map((kw, i) => (
                                  <span key={i} className="text-[10px] bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded dark:bg-red-950/20 dark:text-red-400 dark:border-red-950/50">
                                    {kw}
                                  </span>
                                ))}
                                {analysis.missingKeywords.length > 5 && (
                                  <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded dark:bg-zinc-800 dark:text-zinc-400">+{analysis.missingKeywords.length - 5} more</span>
                                )}
                              </div>
                            </div>
                          )}

                          {analysis.resumeSummary && (
                            <div>
                              <p className="text-[11px] font-bold text-zinc-500 uppercase mb-1">Summary</p>
                              <p className="text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed line-clamp-2">
                                {analysis.resumeSummary}
                              </p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 space-y-3">
                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                          <Target className="size-6" />
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">No saved analyses yet.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

// Sub-component: AddSkillButton (Leetcode-like input toggle widget)
function AddSkillButton({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleSave = () => {
    if (value.trim()) {
      onAdd(value)
      setValue("")
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      {isOpen ? (
        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1.5 shadow-md max-w-[200px] absolute right-0 top-[-8px] z-10">
          <input
            type="text"
            className="text-xs bg-transparent outline-none border-none p-1 w-24 text-zinc-800 dark:text-white"
            placeholder="Add skill..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <button onClick={handleSave} className="p-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white transition-colors">
            <Check className="size-3" />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-500 transition-colors">
            <X className="size-3" />
          </button>
        </div>
      ) : (
        <Button onClick={() => setIsOpen(true)} size="sm" variant="ghost" className="h-8 px-2">
          <Plus className="size-4 text-purple-500" /> Add
        </Button>
      )}
    </div>
  )
}