import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 pb-20 min-h-screen text-black dark:text-white transition-colors duration-300">
      {/* Header Area Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Purple Hero Panel Skeleton */}
      <Card className="border-border/50 bg-slate-50 dark:bg-zinc-900/30">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8 pb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          {/* Stepper Skeleton */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 w-full max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-zinc-950 px-6 py-4 md:py-3 rounded-lg border border-gray-150 dark:border-zinc-800 flex-1 justify-center">
                <Skeleton className="w-6 h-6 rounded-full shrink-0" /> 
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="w-full lg:max-w-2xl space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-12 w-40 rounded-lg" />
            </div>
            
            <div className="w-full lg:w-[350px] mt-auto">
              <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-border p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="size-4" />
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                  <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Left Card: Stats Skeleton */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-8 w-24" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Card: Quick Actions Skeleton */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="flex gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64 mb-6" />
            <Skeleton className="h-10 w-40 rounded-lg" />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Chart skeleton */}
      <Card className="border-border/50">
        <div className="flex items-center gap-6 border-b border-border px-6 pt-4">
          <Skeleton className="h-8 w-28 pb-4" />
          <Skeleton className="h-8 w-36 pb-4" />
        </div>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full space-y-4">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
              <div className="w-full bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-border p-6 space-y-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-full" />
                <div className="bg-white dark:bg-zinc-850 rounded p-5 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
