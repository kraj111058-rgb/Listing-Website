import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function AppLoader({
  className,
  size = "md",
  text,
}: AppLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-slate-500",
        className
      )}
    >
      <Loader2
        className={cn("animate-spin text-indigo-600", sizeClasses[size])}
      />
      {text && <p className="text-xs sm:text-sm font-medium">{text}</p>}
    </div>
  );
}
