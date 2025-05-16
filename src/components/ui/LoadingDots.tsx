
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
}

const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      <div className="h-3 w-3 rounded-full bg-statusshield-purple animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="h-3 w-3 rounded-full bg-statusshield-purple animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="h-3 w-3 rounded-full bg-statusshield-purple animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  );
};

export default LoadingDots;
