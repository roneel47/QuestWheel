
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-6 p-4 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full p-4 bg-card shadow-lg rounded-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-7 w-32" />
          </div>
          <Skeleton className="h-7 w-20" />
        </div>
        <Skeleton className="h-4 w-full" /> {/* XPBar Skeleton */}
      </div>

      {/* RouletteWheel Skeleton */}
      <div className="w-full p-6 bg-card shadow-xl rounded-lg text-center space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* TaskInput Skeleton */}
      <div className="w-full p-6 bg-card shadow-lg rounded-lg space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-grow rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>

      {/* TaskList Skeleton */}
      <div className="w-full p-6 bg-card shadow-lg rounded-lg space-y-4">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
