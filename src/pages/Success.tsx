
import React, { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useMedia } from "@/context/MediaContext";
import { useNavigate } from "react-router-dom";
import ActionButton from "@/components/ui/ActionButton";
import { Check, Share, Image } from "lucide-react";
import { toast } from "sonner";

const Success = () => {
  const { processedMedia, mediaType, setMedia, setMediaType, setProcessedMedia } = useMedia();
  const navigate = useNavigate();
  
  // If no processed media, redirect to home
  useEffect(() => {
    if (!processedMedia) {
      navigate('/');
    }
  }, [processedMedia, navigate]);

  const handlePlayMedia = () => {
    // In a real app, this would open the media in a viewer
    // For demo purposes, we'll just open the URL in a new tab
    if (processedMedia) {
      window.open(processedMedia, '_blank');
    }
  };

  const handleSaveToGallery = () => {
    // In a real app, this would save the media to the device gallery
    // For demo purposes, we'll just show a toast
    toast.success("Media player on Devlopment", {
      description: "click on the download button to save the media to your device."
    });
  };

  const handleShare = () => {
    // In a real app, this would use the native sharing functionality
    // For demo purposes, we'll just show a toast
    toast.success("Shere option on Devlopement", {
      description: "click on the download button to save the media to your device."
    });
  };

  const handleCreateNew = () => {
    // Reset media state and navigate to home
    setMedia(null);
    setMediaType(null);
    setProcessedMedia(null);
    navigate('/');
  };

  if (!processedMedia) {
    return null;
  }

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col items-center justify-center py-4 mb-8">
          <div className="w-16 h-16 bg-statusshield-purple rounded-full flex items-center justify-center mb-6">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Success!</h2>
          <p className="text-statusshield-gray text-center">
            Your {mediaType === "image" ? "photo" : "video"} has been processed and is ready to use.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 mb-8">
          <ActionButton onClick={handleSaveToGallery}>
            Play {mediaType === "image" ? "Photo" : "Video"}
          </ActionButton>
          <ActionButton   onClick={handlePlayMedia} variant="secondary" icon={<Image size={18} />}>
            Save to Gallery
          </ActionButton>
          <ActionButton onClick={handleShare} variant="secondary" icon={<Share size={18} />}>
            Share
          </ActionButton>
        </div>
        
        <div className="text-center">
          <button 
            onClick={handleCreateNew}
            className="text-statusshield-darkgray hover:text-primary-foreground transition-colors"
          >
            Process a new media
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Success;
