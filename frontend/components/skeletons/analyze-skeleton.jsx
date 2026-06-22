import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function AnalyzeSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-5 w-80" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column: Form skeleton */}
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <Skeleton className="h-11 w-full rounded-lg" />
              </CardContent>
            </Card>

            {/* Right Column: Results skeleton */}
            <Card className="border-border/50 h-[350px] flex flex-col justify-center items-center">
              <CardContent className="text-center space-y-4 w-full max-w-sm">
                <Skeleton className="w-24 h-24 rounded-full mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <div className="space-y-2 pt-4 w-full">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6 mx-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
