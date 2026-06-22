import { Sparkles, ChevronUp, ChevronRight, Briefcase, ExternalLink, Users, Upload, FileCheck, Search, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";

export function DashboardPreview() {
  const stats = { total: 42, applied: 20, interview: 15, offer: 3, rejected: 4 };
  const chartData = {
    activity: [
      { name: "Mon", apps: 2 },
      { name: "Tue", apps: 5 },
      { name: "Wed", apps: 3 },
      { name: "Thu", apps: 8 },
      { name: "Fri", apps: 4 },
      { name: "Sat", apps: 1 },
      { name: "Sun", apps: 0 },
    ],
    status: [
      { name: "Applied", value: 20, color: "#3b82f6" },
      { name: "Interview", value: 15, color: "#a855f7" },
      { name: "Offer", value: 3, color: "#10b981" },
      { name: "Rejected", value: 4, color: "#ef4444" },
    ]
  };

  return (
    <div className="flex-1 space-y-6 text-black dark:text-white transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">Overview</h2>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 transition-colors">
          View public page <ExternalLink className="size-4" />
        </div>
      </div>

      {/* Top Purple Hero Section */}
      <div className="bg-[#f0eaff] dark:bg-purple-950/20 rounded-xl p-8 mb-6 border border-[#e4dcf5] dark:border-purple-900/30 relative overflow-hidden shadow-sm">
        <div className="flex items-center justify-between mb-8 pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white">
            <Sparkles className="size-4 text-[#ef4444] dark:text-[#f87171]" /> Get started
          </div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Collapse <ChevronUp className="size-3" />
          </div>
        </div>
        
        <div>
          {/* Stepper equivalent */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 text-sm font-medium text-gray-600 dark:text-gray-300 w-full max-w-4xl mx-auto">
             <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-6 py-4 md:py-3 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 flex-1 justify-center text-black dark:text-white">
               <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs shrink-0">1</span> 
               <span className="whitespace-nowrap">Upload Resume</span>
             </div>
             <div className="hidden md:block">
               <ChevronRight className="size-5 text-gray-400 shrink-0" />
             </div>
             <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-6 py-4 md:py-3 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 flex-1 justify-center text-black dark:text-white">
               <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs shrink-0">2</span> 
               <span className="whitespace-nowrap">Find Jobs</span>
             </div>
             <div className="hidden md:block">
               <ChevronRight className="size-5 text-gray-400 shrink-0" />
             </div>
             <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-6 py-4 md:py-3 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 flex-1 justify-center text-black dark:text-white">
               <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs shrink-0">3</span> 
               <span className="whitespace-nowrap">Track Applications</span>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="w-full lg:max-w-2xl">
              <h1 className="text-4xl font-bold mb-4 text-black dark:text-white tracking-tight">Show off your skills</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-base leading-relaxed max-w-xl">
                Start adding your job applications to the tracker, build out your profile, and see analytics to optimize your hiring process.
              </p>
              <Button className="w-full sm:w-auto bg-[#1e1e1e] dark:bg-white text-white dark:text-black px-8 py-6 rounded-lg text-base font-medium shadow-md">
                Find Jobs <ChevronRight className="ml-2 size-5" />
              </Button>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">✓</div>
                  AI-Powered Matching
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">✓</div>
                  Automated Tracking
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">✓</div>
                  Real-time Analytics
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">✓</div>
                  Smart Resume Scoring
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-[350px] mt-auto">
               <div className="w-full bg-[#f8f5ff] dark:bg-zinc-900/50 rounded-xl border border-[#e4dcf5] dark:border-zinc-800 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center">
                       <img src="/logo.png" alt="Jobify Tracker" className="h-6 object-contain" />
                     </div>
                     <ExternalLink className="size-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-700 p-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Applications</p>
                      <div className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
                        {stats.total} <span className="text-xs font-normal text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Tracked</span>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-700 p-4 flex justify-between items-center">
                       <div>
                         <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Interviews</p>
                         <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.interview}</div>
                       </div>
                       <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                         <Users className="size-4 text-purple-600 dark:text-purple-400" />
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Left Card: Stats */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Users className="size-4" /> Application Stats
            </div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-1.5">
              Edit
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-3xl font-bold text-black dark:text-white mb-6 flex items-baseline gap-2">
              {stats.total} <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applications</span>
            </div>
            
            <div className="space-y-4">
              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Applied</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{stats.applied}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(stats.applied / stats.total) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">Interviewing</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{stats.interview}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(stats.interview / stats.total) * 100}%` }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-green-600 dark:text-green-400 font-medium">Offers</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{stats.offer}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: `${(stats.offer / stats.total) * 100}%` }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-600 dark:text-red-400 font-medium">Rejected</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{stats.rejected}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${(stats.rejected / stats.total) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">Weekly Target</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 shrink-0">
                <FileCheck className="size-5" />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center text-sm font-bold text-black dark:text-white mb-2">
                  <span>50 Applications</span>
                  <span className="text-blue-500">42/50</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(42/50)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Quick Actions */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Briefcase className="size-4" /> Jobs
            </div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-1.5">
              Manage
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-2xl font-bold text-black dark:text-white">AI Job Matcher</div>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="flex gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black"><Search className="size-5" /></div>
              <div className="w-10 h-10 rounded-lg bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white"><Sparkles className="size-5" /></div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500 dark:bg-emerald-400 flex items-center justify-center text-white"><Briefcase className="size-5" /></div>
            </div>
            <div className="font-bold text-black dark:text-white mb-2 text-lg">Find jobs with context</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Swipe through AI-recommended jobs curated just for you</p>
            
            <Button className="bg-[#1e1e1e] dark:bg-white text-white dark:text-black px-6 py-5 rounded-lg shadow-md">
              Discover Jobs <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom section: Analytics Chart & Recent Applications */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-0 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-zinc-800 px-6 pt-4 bg-gray-50/50 dark:bg-zinc-900/50 overflow-x-auto whitespace-nowrap">
          <button className="flex items-center gap-2 text-sm font-semibold pb-4 border-b-2 transition-colors border-black dark:border-white text-black dark:text-white">
            Analytics Data
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold pb-4 border-b-2 transition-colors border-transparent text-gray-500 dark:text-gray-400">
            Recent Applications
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full max-w-full overflow-hidden">
               <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Track your activity with charts</h3>
               <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl">
                 Visualizing your application volume over time helps identify patterns. Share your stats to keep yourself accountable and track your growth.
               </p>
               
               <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-800 w-full overflow-x-auto">
                  <AnalyticsChart activityData={chartData.activity} statusData={chartData.status} />
               </div>
            </div>
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
               <div className="w-full bg-[#f8f5ff] dark:bg-zinc-800/30 rounded-xl border border-[#e4dcf5] dark:border-zinc-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                       <div className="w-6 h-6 bg-black dark:bg-white rounded flex items-center justify-center"><BarChart3 className="size-3 text-white dark:text-black" /></div>
                       <div className="font-bold text-xs text-black dark:text-white">Insights</div>
                     </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">A high-level view of your job search progress. Keep applying!</div>
                  <div className="w-full bg-white dark:bg-zinc-800 rounded shadow-sm border border-gray-100 dark:border-zinc-700 p-5 flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-start gap-3">
                       <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                       <p>You have submitted <strong>{stats.applied}</strong> applications waiting for response.</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                       <p>You have <strong>{stats.interview}</strong> active interviews. Keep preparing!</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                       <p>Congratulations! You have <strong>{stats.offer}</strong> job offers.</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                       <p><strong>{stats.rejected}</strong> applications were rejected. Don't give up, keep refining your approach!</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
