
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
}

export function LoadingIndicator({ 
  message = "Analyzing image...", 
  className 
}: LoadingIndicatorProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-6 space-y-4",
      className
    )}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" 
          style={{ animationDuration: '1.5s' }} />
      </div>
      <p className="text-base text-muted-foreground animate-pulse-subtle">{message}</p>
    </div>
  );
}
