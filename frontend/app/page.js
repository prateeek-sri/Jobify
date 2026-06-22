"use client";

import { HomepagePreview } from "@/components/HomepagePreview";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronRight, Play, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    const user = localStorage.getItem("user");
    router.push(user ? "/dashboard" : "/login");
  };

  return (
    <div className="relative font-sans text-slate-900 overflow-x-hidden selection:bg-blue-200">
      
      {/* FIXED GLOBAL BACKGROUND TO COVER BODY/HEADER GAP */}
      <div className="fixed inset-0 bg-[#FDFDFD] -z-20 pointer-events-none" />

      {/* VIBRANT MESH GRADIENT BACKGROUND BLOBS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-[-10]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[600px] bg-blue-500/40 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[5%] right-[-5%] w-[40%] h-[500px] bg-purple-500/30 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[20%] left-[20%] w-[30%] h-[400px] bg-yellow-300/30 blur-[120px] rounded-full mix-blend-multiply" />
        
        <div className="absolute top-[60%] right-[-10%] w-[40%] h-[600px] bg-yellow-200/40 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[75%] left-[-5%] w-[50%] h-[500px] bg-blue-400/30 blur-[150px] rounded-full mix-blend-multiply" />
      </div>

      <div className="relative z-10">

        {/* HEADER AREA */}
        <header className="pt-24 pb-12 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 mt-8">
            Take Control of <br/> Your Career Path
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
            Jobify uses AI to automate your applications, track your pipeline with Kanban boards, and maximize your interview chances effortlessly.
          </p>
          
          <Button 
            onClick={handleClick}
            className="rounded-full px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold shadow-xl shadow-slate-900/20 transition-all hover:scale-105"
          >
            Start For Free
          </Button>
        </header>

        {/* HERO MOCKUP */}
        <section className="px-4 md:px-8 max-w-6xl mx-auto mb-24">
          <div className="rounded-2xl bg-white/80 backdrop-blur-2xl shadow-2xl shadow-blue-900/10 border border-slate-200/60 overflow-hidden ring-1 ring-slate-900/5">
            {/* Browser top bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200/60">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-500 shadow-sm flex items-center gap-1">
                  <span className="text-slate-400">🔒</span> jobify.app
                </div>
              </div>
            </div>
            
            <div className="p-2 sm:p-6 bg-slate-50/50 pointer-events-none relative overflow-hidden">
               <HomepagePreview />
            </div>
          </div>
        </section>



        {/* FEATURES OVERVIEW */}
        <section className="text-center px-6 mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Powerful online tracking</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Everything you need to organize your job search. Build your profile, analyze your resume against real ATS systems, and drag-and-drop your applications to success.
          </p>
        </section>

        {/* CARDS SECTION */}
        <section className="px-4 md:px-8 max-w-6xl mx-auto space-y-12 mb-32">
          
          {/* WIDE BLUE CARD */}
          <div className="w-full bg-blue-600 rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl shadow-blue-600/20">
             <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-white/10 to-transparent skew-x-12" />
             
             <div className="flex-1 space-y-6 z-10">
               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Star className="text-white fill-white size-6" />
               </div>
               <h3 className="text-3xl md:text-4xl font-bold leading-tight">Resume Intelligence</h3>
               <p className="text-blue-100 text-lg leading-relaxed max-w-lg">
                 Jobify instantly analyzes your uploaded resume, assigning an ATS score and identifying critical missing keywords. Tailor your resume specifically to the roles you want.
               </p>
               <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full font-bold px-8" asChild>
                 <Link href="/resume">
                   Try It Now
                 </Link>
               </Button>
             </div>
             
             <div className="flex-1 w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 flex flex-col gap-4 shadow-xl z-10">
                 <div className="h-4 w-1/3 bg-white/30 rounded-full" />
                 <div className="h-2 w-full bg-white/20 rounded-full" />
                 <div className="h-2 w-5/6 bg-white/20 rounded-full" />
                 <div className="h-2 w-4/6 bg-white/20 rounded-full" />
                 
                 <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-400/30 text-xs font-semibold">React</span>
                    <span className="px-3 py-1 rounded-full bg-blue-400/30 text-xs font-semibold">Node.js</span>
                    <span className="px-3 py-1 rounded-full bg-blue-400/30 text-xs font-semibold">TypeScript</span>
                 </div>
                 
                 <div className="mt-6 flex items-end gap-4">
                    <div className="text-5xl font-black">95%</div>
                    <div className="text-sm text-blue-200 pb-1 font-medium">ATS Match Score</div>
                 </div>
             </div>
          </div>

          {/* CENTERED WHITE CARD */}
          <div className="w-full bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
             
             <div className="flex-1 flex justify-center order-2 md:order-1 relative">
                <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full" />
                {/* Mockup visual */}
                <div className="w-64 h-80 bg-slate-50 border border-slate-200 rounded-3xl shadow-xl p-4 flex flex-col gap-3 relative z-10">
                   <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center">
                     <span className="text-xl">💼</span>
                   </div>
                   <div className="h-3 w-3/4 bg-slate-200 rounded-full" />
                   <div className="h-2 w-full bg-slate-100 rounded-full" />
                   <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
                   
                   <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between">
                     <div className="w-8 h-8 rounded bg-green-100" />
                     <div className="w-20 h-8 rounded bg-blue-600" />
                   </div>
                </div>
             </div>

             <div className="flex-1 space-y-6 order-1 md:order-2">
               <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Automated Job Matching</h3>
               <p className="text-slate-600 text-lg leading-relaxed">
                 Stop endlessly searching. Our AI cross-references your parsed resume and technical skills against real-time job market data to find your perfect matches.
               </p>
               <Button variant="outline" className="rounded-full font-bold px-8 border-slate-300 text-slate-700" asChild>
                 <Link href="/jobs">
                   Find Jobs
                 </Link>
               </Button>
             </div>
          </div>

          {/* WIDE GREEN CARD */}
          <div className="w-full bg-[#39AC55] rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl shadow-green-600/20">
             
             <div className="flex-1 w-full bg-[#2E8B44] rounded-2xl p-6 shadow-inner relative overflow-hidden">
                 {/* Kanban Mockup */}
                 <div className="flex gap-4 min-h-[200px]">
                    <div className="flex-1 bg-white/10 rounded-lg p-3 flex flex-col gap-3 backdrop-blur-sm">
                       <div className="text-sm font-bold opacity-80">Applied</div>
                       <div className="bg-white rounded p-3 shadow-sm">
                         <div className="h-2 w-1/2 bg-slate-200 rounded mb-2" />
                         <div className="h-2 w-full bg-slate-100 rounded" />
                       </div>
                       <div className="bg-white rounded p-3 shadow-sm">
                         <div className="h-2 w-2/3 bg-slate-200 rounded mb-2" />
                         <div className="h-2 w-full bg-slate-100 rounded" />
                       </div>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg p-3 flex flex-col gap-3 backdrop-blur-sm">
                       <div className="text-sm font-bold opacity-80">Interviewing</div>
                       <div className="bg-white rounded p-3 shadow-sm border-2 border-green-400">
                         <div className="h-2 w-3/4 bg-slate-200 rounded mb-2" />
                         <div className="h-2 w-full bg-slate-100 rounded" />
                       </div>
                    </div>
                 </div>
             </div>

             <div className="flex-1 space-y-6">
               <h3 className="text-3xl md:text-4xl font-bold leading-tight">Manage Your Pipeline</h3>
               <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-6 text-green-200 shrink-0" />
                    <div>
                      <div className="font-bold text-lg">Visual Kanban Board</div>
                      <div className="text-green-100 text-sm">Drag and drop applications across stages easily.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-6 text-green-200 shrink-0" />
                    <div>
                      <div className="font-bold text-lg">Status Analytics</div>
                      <div className="text-green-100 text-sm">Monitor your conversion rates and success metrics.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-6 text-green-200 shrink-0" />
                    <div>
                      <div className="font-bold text-lg">Seamless Editing</div>
                      <div className="text-green-100 text-sm">Update company details, links, and notes instantly.</div>
                    </div>
                  </li>
               </ul>
             </div>
             
          </div>

        </section>

        {/* ROADMAP */}
        <section className="px-6 max-w-4xl mx-auto mb-32 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Our Workflow</h2>
          <p className="text-slate-600 mb-12">How Jobify streamlines your entire career journey.</p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8 relative">
             <div className="hidden sm:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10" />
             
             <div className="flex flex-col items-center max-w-[200px]">
               <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm">1</div>
               <div className="font-bold text-slate-900 mb-2">Upload Resume</div>
               <div className="text-sm text-slate-500">Drop your PDF to automatically parse skills and experience.</div>
             </div>

             <div className="flex flex-col items-center max-w-[200px]">
               <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm">2</div>
               <div className="font-bold text-slate-900 mb-2">AI Analysis</div>
               <div className="text-sm text-slate-500">Get an instant ATS score and tailored keyword recommendations.</div>
             </div>

             <div className="flex flex-col items-center max-w-[200px]">
               <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm">3</div>
               <div className="font-bold text-slate-900 mb-2">Track & Succeed</div>
               <div className="text-sm text-slate-500">Move cards through the pipeline until you secure the offer.</div>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
