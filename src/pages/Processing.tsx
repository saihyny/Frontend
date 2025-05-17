import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useMedia } from "@/context/MediaContext";
import { useNavigate } from "react-router-dom";
import LoadingDots from "@/components/ui/LoadingDots";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Processing = () => {
  const { media, mediaType, setProcessedMedia } = useMedia();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Preparing");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (!media || !mediaType) {
      navigate('/');
      return;
    }

    const uploadAndProcess = async () => {
      try {
        setStatus("Uploading media...");
        setProgress(10);

        // Prepare form data for upload
        const formData = new FormData();
        formData.append('media', media);

        // Send POST request to backend
        const response = await fetch('http://localhost:3000/process-media', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process media');
        }

        setStatus("Processing on server...");
        setProgress(50);

        // Assuming backend returns JSON with processed file path/url
        const result = await response.json();

        // Build full URL to processed media (adjust if your backend serves static files differently)
        const processedUrl = `http://localhost:3000${result.outputFile}`;

        // Set the processed media URL in your context for use elsewhere
        setProcessedMedia(processedUrl);

        setStatus("Finalizing...");
        setProgress(90);

        // Delay to show complete progress bar nicely
        setTimeout(() => {
          setProgress(100);
          setStatus("Complete");
          setIsProcessing(false);
          // Navigate to success page or display success UI
          navigate('/success');
        }, 700);
      } catch (error) {
        console.error("Error during processing:", error);
        setIsProcessing(false);
        toast.error("Processing failed", {
          description: "There was a problem processing your media."
        });
      }
    };

    uploadAndProcess();

    return () => {
      setIsProcessing(false);
    };
  }, [media, mediaType, navigate, setProcessedMedia]);

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
