import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar Skeleton (Profile Info) */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="border-border/50">
              <CardContent className="pt-6 space-y-6">
                {/* Avatar & Name */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <Skeleton className="w-28 h-28 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </div>
                </div>

                <Skeleton className="h-10 w-full rounded-lg" />

                {/* Contact details */}
                <div className="space-y-3 pt-4 border-t border-border">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>

                {/* Social icons */}
                <div className="flex justify-center gap-4 pt-4 border-t border-border">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-8 h-8 rounded-full" />
                  ))}
                </div>

                {/* Skills tags */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <Skeleton className="h-5 w-20" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Main Column Skeleton */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Row 1: ATS metrics (LeetCode circular style) */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="flex flex-col items-center space-y-2 md:col-span-1 border-r border-border md:pr-6">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-5 w-24" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Row 2: Pipeline Activity Grid (Leetcode contribution calendar) */}
            <Card className="border-border/50">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-28" />
                </div>
                {/* 16 columns of squares */}
                <div className="flex gap-1.5 overflow-x-auto pb-2">
                  {[...Array(16)].map((_, col) => (
                    <div key={col} className="flex flex-col gap-1.5 shrink-0">
                      {[...Array(7)].map((_, row) => (
                        <Skeleton key={row} className="w-3.5 h-3.5 rounded-sm" />
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Row 3: Lists (Experience / Projects / Education) */}
            <Card className="border-border/50">
              <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="p-4 border border-border rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </main>
    </div>
  )
}
