
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsLoading() {
  return (
    <div className="space-y-8 p-4 md:p-8 animate-pulse">
      <Skeleton className="h-9 w-48" /> {/* Page Title Skeleton */}

      {/* Summary Stats Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-card shadow-lg rounded-lg space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>
        <div className="p-6 bg-card shadow-lg rounded-lg space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
