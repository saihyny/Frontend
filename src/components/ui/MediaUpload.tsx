
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMedia } from "@/context/MediaContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MediaUploadProps {
  type: "image" | "video";
  className?: string;
}

const MediaUpload = ({ type, className }: MediaUploadProps) => {
  const { setMedia, setMediaType } = useMedia();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (type === "image" && !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      toast.error("Please select a video file");
      return;
    }

    // Set the media and type in context
    setMedia(file);
    setMediaType(type);
    
    // Navigate to preview
    navigate("/preview");
  };

  return (
    <div className={className}>
      <div 
        className="upload-button" 
        onClick={handleClick}
      >
        {type === "image" ? (
          <Image 
            size={48} 
            className="text-primary-foreground mb-2"
          />
        ) : (
          <Video 
            size={48} 
            className="text-primary-foreground mb-2"
          />
        )}
        <span className="text-lg font-semibold">
          Upload {type === "image" ? "Photo" : "Video"}
        </span>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={type === "image" ? "image/*" : "video/*"}
        className="hidden"
      />
    </div>
  );
};

export default MediaUpload;
