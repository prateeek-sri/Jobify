import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ResumeSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-12">
          {/* Header Skeleton */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-5 w-2/3 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Upload card skeleton */}
            <Card className="border-border/50 h-[400px] flex flex-col justify-between">
              <CardContent className="p-8 flex-1 flex flex-col justify-center items-center space-y-6">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2 w-full text-center">
                  <Skeleton className="h-5 w-1/2 mx-auto" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
                <Skeleton className="h-28 w-full border border-dashed border-border rounded-xl" />
              </CardContent>
            </Card>

            {/* Right: Preview skeleton */}
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
          </div>
        </div>
      </main>
    </div>
  )
}
