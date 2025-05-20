
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useMedia } from "@/context/MediaContext";
import { useNavigate } from "react-router-dom";
import LoadingDots from "@/components/ui/LoadingDots";
import { Progress } from "@/components/ui/progress";
import { addBlackScreenToMedia, trackProcessingProgress } from "@/utils/mediaProcessor";
import { toast } from "sonner";

const Processing = () => {
  const { media, mediaType, blackScreenDuration, setProcessedMedia } = useMedia();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Preparing");
  const [isProcessing, setIsProcessing] = useState(true);
  
  // If no media is selected, redirect to home
  useEffect(() => {
    if (!media || !mediaType) {
      navigate('/');
      return;
    }

    const processMedia = async () => {
      try {
        setStatus("Preparing");
        
        // Start tracking progress (visual feedback)
        trackProcessingProgress(media, (currentProgress) => {
          setProgress(currentProgress);
          
          // Update status message based on progress
          if (currentProgress < 30) {
            setStatus("Adding black screen");
          } else if (currentProgress < 60) {
            setStatus("Processing media");
          } else {
            setStatus("Finalizing");
          }
        });
        
        // Actual processing
        const processedBlob = await addBlackScreenToMedia(
          media, 
          mediaType, 
          blackScreenDuration
        );
        
        // Set the processed media URL in context
        setProcessedMedia(URL.createObjectURL(processedBlob));
        
        // Complete progress
        setProgress(100);
        setStatus("Complete");
        
        // Small delay before navigating to success page
        setTimeout(() => {
          navigate('/success');
        }, 500);
      } catch (error) {
        console.error("Processing error:", error);
        setIsProcessing(false);
        toast.error("Processing failed", {
          description: "There was a problem processing your media."
        });
      }
    };

    processMedia();

    return () => {
      // Cleanup if component unmounts
      setIsProcessing(false);
    };
  }, [media, mediaType, blackScreenDuration, navigate, setProcessedMedia]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
        <div className="w-20 h-20 mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-statusshield-purple/30"></div>
          <div 
            className="absolute inset-0 rounded-full border-4 border-statusshield-purple border-r-transparent"
            style={{ 
              transform: 'rotate(45deg)',
              animation: 'spin 1.5s linear infinite'
            }}
          ></div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">Processing your {mediaType}</h3>
        <p className="text-statusshield-gray mb-8">{status}...</p>
        
        <LoadingDots className="mb-6" />
        
        <div className="w-full max-w-xs mb-2">
          <Progress value={progress} className="h-2 bg-statusshield-lightgray" />
        </div>
        <p className="text-sm text-statusshield-darkgray">{progress}%</p>
      </div>
    </AppLayout>
  );
};

export default Processing;
