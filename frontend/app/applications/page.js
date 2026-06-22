"use client";

import { ApplicationsList } from "@/components/applications/applications-list";
import { ApplicationFilters } from "@/components/applications/application-filters";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ApplicationsSkeleton } from "@/components/skeletons/applications-skeleton";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return; // Handle redirect if needed
        const user = JSON.parse(storedUser);

        // Note: If your getHistory API uses req.body.userId, switch to POST or use query param
        // Assuming your previous getHistory implementation:
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/application/history?userId=${
            user._id || user.id
          }`
        );

        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading) {
    return <ApplicationsSkeleton />;
  }

  const counts = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "APPLIED").length,
    interview: applications.filter((a) => a.status === "INTERVIEW").length,
    offer: applications.filter((a) => a.status === "OFFER").length,
    rejected: applications.filter((a) => a.status === "REJECTED").length,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
            <h1 className="text-2xl font-bold text-black dark:text-white">Job Application Pipeline Management</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
               <div className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300">Total: {counts.total}</div>
               <div className="px-4 py-1.5 rounded-full bg-[#dbeafe] text-[#1e40af] dark:bg-blue-900/30 dark:text-blue-300">Applied: {counts.applied}</div>
               <div className="px-4 py-1.5 rounded-full bg-[#f3e8ff] text-[#6b21a8] dark:bg-purple-900/30 dark:text-purple-300">Interviewing: {counts.interview}</div>
               <div className="px-4 py-1.5 rounded-full bg-[#d1fae5] text-[#065f46] dark:bg-emerald-900/30 dark:text-emerald-300">Offers: {counts.offer}</div>
               <div className="px-4 py-1.5 rounded-full bg-[#fee2e2] text-[#991b1b] dark:bg-red-900/30 dark:text-red-300">Rejected: {counts.rejected}</div>
            </div>
          </div>

          <ApplicationFilters applications={applications} />

          {/* Pass data and setter to the Kanban Board */}
          <ApplicationsList
            applications={applications}
            setApplications={setApplications}
          />
        </div>
      </main>
    </div>
  );
}
