"use client";

import { useEffect, useState } from "react";
import { showProfessionalToast } from "@/components/customToast";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  FileCheck,
  XCircle,
  Loader2,
  Search,
  ExternalLink,
  Sparkles,
  ChevronUp,
  ChevronRight,
  BarChart3,
  Upload
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentApplications } from "@/components/dashboard/recent-applications";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("analytics");
  const [heroCollapsed, setHeroCollapsed] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });
  const [chartData, setChartData] = useState({
    activity: [],
    status: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const user = JSON.parse(storedUser);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/application/history?userId=${
            user._id || user.id
          }`
        );
        const apps = await res.json();

        if (Array.isArray(apps)) {
          processData(apps);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (apps) => {
    const counts = {
      total: apps.length,
      applied: apps.filter((a) => a.status === "APPLIED").length,
      interview: apps.filter((a) => a.status === "INTERVIEW").length,
      offer: apps.filter((a) => a.status === "OFFER").length,
      rejected: apps.filter((a) => a.status === "REJECTED").length,
    };
    setStats(counts);

    const statusChartData = [
      { name: "Applied", value: counts.applied, color: "#3b82f6" },
      { name: "Interview", value: counts.interview, color: "#a855f7" },
      { name: "Offer", value: counts.offer, color: "#10b981" },
      { name: "Rejected", value: counts.rejected, color: "#ef4444" },
    ].filter((item) => item.value > 0);

    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        date: d.toISOString().split("T")[0],
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        count: 0,
      };
    });

    apps.forEach((app) => {
      const appDate = app.createdAt.split("T")[0];
      const dayObj = last7Days.find((d) => d.date === appDate);
      if (dayObj) dayObj.count += 1;
    });

    const activityChartData = last7Days.map((d) => ({
      name: d.dayName,
      apps: d.count,
    }));

    setChartData({ activity: activityChartData, status: statusChartData });
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 pb-20 min-h-screen text-black dark:text-white transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">Overview</h2>
        <Link href="/jobs" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
          View public page <ExternalLink className="size-4" />
        </Link>
      </div>

      {/* Top Purple Hero Section */}
      <div className={`bg-[#f0eaff] dark:bg-purple-950/20 rounded-xl p-8 mb-6 border border-[#e4dcf5] dark:border-purple-900/30 relative overflow-hidden shadow-sm transition-all duration-500 ${heroCollapsed ? 'max-h-[80px] overflow-hidden p-6' : ''}`}>
        <div className="flex items-center justify-between mb-8 pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white">
            <Sparkles className="size-4 text-[#ef4444] dark:text-[#f87171]" /> Get started
          </div>
          <button onClick={() => setHeroCollapsed(!heroCollapsed)} className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1">
            {heroCollapsed ? 'Expand' : 'Collapse'} <ChevronUp className={`size-3 transition-transform duration-300 ${heroCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className={`transition-opacity duration-300 ${heroCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Stepper equivalent */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 text-sm font-medium text-gray-600 dark:text-gray-300 w-full max-w-4xl mx-auto">
             <div onClick={() => router.push('/resume')} className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-6 py-4 md:py-3 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 flex-1 justify-center text-black dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
               <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs shrink-0">1</span> 
               <span className="whitespace-nowrap">Upload Resume</span>
             </div>
             
             <div className="hidden md:block">
               <ChevronRight className="size-5 text-gray-400 shrink-0" />
             </div>
             
             <div onClick={() => router.push('/jobs')} className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-6 py-4 md:py-3 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 flex-1 justify-center text-black dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
               <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs shrink-0">2</span> 
               <span className="whitespace-nowrap">Find Jobs</span>
             </div>
             
             <div className="hidden md:block">
               <ChevronRight className="size-5 text-gray-400 shrink-0" />
             </div>
             
             <div onClick={() => router.push('/applications')} className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-6 py-4 md:py-3 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 flex-1 justify-center text-black dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
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
              <Button onClick={() => router.push("/jobs")} className="w-full sm:w-auto bg-[#1e1e1e] dark:bg-white hover:bg-black dark:hover:bg-zinc-200 text-white dark:text-black px-8 py-6 rounded-lg text-base font-medium transition-all shadow-md">
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
            
            <div onClick={() => router.push('/applications')} className="w-full lg:w-[350px] cursor-pointer group mt-auto">
               <div className="w-full bg-[#f8f5ff] dark:bg-zinc-900/50 rounded-xl border border-[#e4dcf5] dark:border-zinc-800 shadow-sm p-6 transition-transform group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-2">
                       <div className="w-8 h-8 bg-black dark:bg-white rounded flex items-center justify-center"><Briefcase className="size-4 text-white dark:text-black" /></div>
                       <div className="font-bold text-sm text-black dark:text-white">Jobify Tracker</div>
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
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Users className="size-4" /> Application Stats
            </div>
            <button onClick={() => router.push("/profile")} className="text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              Edit
            </button>
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
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.total ? (stats.applied / stats.total) * 100 : 0}%` }}></div>
                </div>
              </div>
              
              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">Interviewing</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{stats.interview}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.total ? (stats.interview / stats.total) * 100 : 0}%` }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-green-600 dark:text-green-400 font-medium">Offers</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{stats.offer}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.total ? (stats.offer / stats.total) * 100 : 0}%` }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-600 dark:text-red-400 font-medium">Rejected</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{stats.rejected}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.total ? (stats.rejected / stats.total) * 100 : 0}%` }}></div>
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
                  <span className="text-blue-500">{stats.total > 50 ? 50 : stats.total}/50</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((stats.total / 50) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Quick Actions */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Briefcase className="size-4" /> Jobs
            </div>
            <button onClick={() => router.push("/jobs")} className="text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              Manage
            </button>
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
            
            <Button onClick={() => router.push("/jobs")} className="bg-[#1e1e1e] dark:bg-white hover:bg-black dark:hover:bg-zinc-200 text-white dark:text-black px-6 py-5 rounded-lg shadow-md transition-all">
              Discover Jobs <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom section: Analytics Chart & Recent Applications */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-0 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-zinc-800 px-6 pt-4 bg-gray-50/50 dark:bg-zinc-900/50 overflow-x-auto whitespace-nowrap">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 text-sm font-semibold pb-4 border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            Analytics Data
          </button>
          <button 
            onClick={() => setActiveTab('recent')}
            className={`flex items-center gap-2 text-sm font-semibold pb-4 border-b-2 transition-colors ${activeTab === 'recent' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            Recent Applications
          </button>
        </div>
        
        <div className="p-8">
          {activeTab === 'analytics' ? (
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
                      {stats.total === 0 ? (
                        <div className="flex items-start gap-3">
                           <div className="mt-1 w-2 h-2 rounded-full bg-gray-400 shrink-0"></div>
                           <p>Start applying to jobs to see your insights grow here.</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start gap-3">
                             <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                             <p>You have submitted <strong>{stats.applied}</strong> applications waiting for response.</p>
                          </div>
                          {stats.interview > 0 && (
                            <div className="flex items-start gap-3">
                               <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                               <p>You have <strong>{stats.interview}</strong> active interviews. Keep preparing!</p>
                            </div>
                          )}
                          {stats.offer > 0 && (
                            <div className="flex items-start gap-3">
                               <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                               <p>Congratulations! You have <strong>{stats.offer}</strong> job offers.</p>
                            </div>
                          )}
                          {stats.rejected > 0 && (
                            <div className="flex items-start gap-3">
                               <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                               <p><strong>{stats.rejected}</strong> applications were rejected. Don't give up, keep refining your approach!</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Recent Applications</h3>
                  <p className="text-gray-600 dark:text-gray-300">Review and update the status of your latest job applications.</p>
                </div>
              </div>
              <RecentApplications />
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

