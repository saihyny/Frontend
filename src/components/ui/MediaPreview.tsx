
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MediaPreviewProps {
  file: File;
  type: "image" | "video";
  className?: string;
}

const MediaPreview = ({ file, type, className }: MediaPreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!previewUrl) {
    return <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>;
  }

  return (
    <div className={cn("rounded-lg overflow-hidden shadow-md", className)}>
      {type === "image" ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-auto object-contain"
        />
      ) : (
        <video
          src={previewUrl}
          controls
          className="w-full h-auto"
        />
      )}
    </div>
  );
};

export default MediaPreview;
