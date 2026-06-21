import { Skeleton } from "@/components/ui/skeleton"

const WAVEFORM_HEIGHTS = [
  28, 42, 36, 52, 24, 48, 32, 56, 20, 44, 38, 50, 26, 46, 34, 54,
  22, 40, 30, 58, 18, 36, 44, 28, 52, 24, 48, 32, 50, 26, 42, 38,
  46, 20, 54, 30, 40, 34, 48, 22,
]

export function PodcastPlayerSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 w-full max-w-6xl border border-gray-200">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0 w-full md:w-auto">
          <Skeleton className="w-full md:w-48 h-64 rounded-2xl" />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-4/5 max-w-md rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>

          <div className="flex items-center gap-6 my-4">
            <Skeleton className="w-16 h-16 rounded-full shrink-0" />

            <div className="relative h-15 flex-1">
              <div className="absolute inset-0 hidden md:flex items-center justify-center gap-px px-2">
                {WAVEFORM_HEIGHTS.map((height, index) => (
                  <Skeleton
                    key={index}
                    className="w-[3px] rounded-sm shrink-0"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 md:hidden flex items-center">
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Skeleton className="h-10 w-14 rounded-lg" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-12 rounded-lg" />
                <Skeleton className="h-6 w-12 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-6">
              <Skeleton className="h-4 w-10 rounded-lg" />
              <Skeleton className="h-4 w-16 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-4 w-48 mt-4 rounded-lg" />
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-6 pt-6 border-t border-gray-200">
        <Skeleton className="h-4 w-28 rounded-lg" />
        <Skeleton className="h-5 w-5 rounded-lg" />
      </div>
    </div>
  )
}

export function PodcastListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="w-full space-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full flex flex-col items-center">
          <PodcastPlayerSkeleton />
        </div>
      ))}
    </div>
  )
}
