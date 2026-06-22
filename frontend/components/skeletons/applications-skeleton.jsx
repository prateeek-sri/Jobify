import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ApplicationsSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        <div className="space-y-6">
          {/* Header & Pipeline counts skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-zinc-850">
            <Skeleton className="h-8 w-80" />
            <div className="flex flex-wrap items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* Filter Bar Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Kanban Columns Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Applied", "Interviewing", "Offer", "Rejected"].map((colTitle, index) => (
              <div key={index} className="flex flex-col bg-slate-50 dark:bg-zinc-900/50 rounded-xl p-4 min-h-[500px] border border-border/50">
                {/* Column Title */}
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="w-6 h-6 rounded-full" />
                </div>
                
                {/* Pulse cards inside columns */}
                <div className="space-y-3 flex-1">
                  {[...Array(index === 0 ? 3 : index === 1 ? 2 : 1)].map((_, cardIdx) => (
                    <Card key={cardIdx} className="border-border/50 shadow-sm cursor-grab">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="w-8 h-4 rounded" />
                        </div>
                        <Skeleton className="h-3 w-1/2" />
                        <div className="flex justify-between items-center pt-2">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="w-6 h-6 rounded-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
