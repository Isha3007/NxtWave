import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SchemeCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <Skeleton className="h-3 w-24 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div>
          <Skeleton className="h-3 w-32 mb-2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2 mt-1" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function SchemesGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SchemeCardSkeleton key={i} />
      ))}
    </div>
  );
}
