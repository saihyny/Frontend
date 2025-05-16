
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useMedia } from "@/context/MediaContext";
import MediaPreview from "@/components/ui/MediaPreview";
import ActionButton from "@/components/ui/ActionButton";
import { Check, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Preview = () => {
  const { media, mediaType, blackScreenDuration } = useMedia();
  const navigate = useNavigate();
  const { toast } = useToast();

  // If no media is selected, redirect to home
  React.useEffect(() => {
    if (!media || !mediaType) {
      navigate('/');
    }
  }, [media, mediaType, navigate]);

  if (!media || !mediaType) {
    return null;
  }

  const handleProcessMedia = () => {
    // In a real app, this would process the media
    // For demo purposes, we'll just navigate to the processing screen
    navigate('/processing');
  };

  const handleChangeMedia = () => {
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <MediaPreview 
            file={media} 
            type={mediaType} 
            className="mb-6"
          />
          <div className="bg-white p-4 rounded-lg shadow-sm border border-statusshield-purple/30 mt-4">
            <div className="flex items-start gap-3">
              <ArrowDown className="text-primary-foreground mt-1 flex-shrink-0" size={20} />
              <p className="text-sm">
                A <strong>{blackScreenDuration}-second</strong> black screen will be added before your {mediaType === "image" ? "photo" : "video"}.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <ActionButton 
            onClick={handleProcessMedia} 
            icon={<Check size={18} />}
          >
            Confirm & Process
          </ActionButton>
          <ActionButton 
            onClick={handleChangeMedia} 
            variant="outline"
          >
            Change Media
          </ActionButton>
        </div>
      </div>
    </AppLayout>
  );
};

export default Preview;
