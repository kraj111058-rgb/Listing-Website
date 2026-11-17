import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  inline?: boolean;
}

const sizeClasses = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-8",
  lg: "size-12",
};

function AppLoader({
  className,
  size = "md",
  text,
  fullScreen = false,
  inline = false,
}: AppLoaderProps) {
  if (inline) {
    return (
      <Loader2
        className={cn("animate-spin shrink-0", sizeClasses[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-slate-500",
        fullScreen && "min-h-screen w-full",
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

export const Loader = AppLoader;
