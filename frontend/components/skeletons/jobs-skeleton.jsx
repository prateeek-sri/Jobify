import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function JobsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="text-center space-y-2">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-5 w-80 mx-auto" />
          </div>

          {/* Filters Bar Skeleton */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <Skeleton className="h-10 w-32 rounded-lg shrink-0 w-full md:w-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Job Swiper Card Skeleton */}
          <div className="flex flex-col items-center justify-center py-6">
            <Card className="w-full max-w-2xl border-border/50 relative overflow-hidden h-[420px] shadow-lg flex flex-col justify-between">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-lg" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>

                <div className="space-y-2.5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* Bottom Actions Skeleton */}
              <div className="p-6 border-t border-border flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50">
                <Skeleton className="h-10 w-24 rounded-full" />
                <div className="flex gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
                <Skeleton className="h-10 w-24 rounded-full" />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
