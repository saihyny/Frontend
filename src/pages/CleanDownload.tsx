
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AppLayout from "@/components/layout/AppLayout";

const CleanDownload = () => {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [addBlackScreen, setAddBlackScreen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid video URL",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      setProcessedVideoUrl(null);
      setProgress(0);
      
      // Simulated processing steps
      await simulateProcessing();
      
      // Set a sample processed URL for demo purposes
      setProcessedVideoUrl("https://example.com/processed-video.mp4");
      
      toast({
        title: "Success",
        description: "Video processed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateProcessing = async () => {
    const steps = [
      { message: "Downloading video...", duration: 1500 },
      { message: "Analyzing content...", duration: 1200 },
      { message: "Detecting usernames...", duration: 1300 },
      { message: "Removing watermarks...", duration: 1800 },
      { message: addBlackScreen ? "Adding black screen..." : "Finalizing...", duration: 1000 },
      { message: "Preparing download...", duration: 800 },
    ];
    
    let cumulativeProgress = 0;
    const progressPerStep = 100 / steps.length;
    
    for (const step of steps) {
      setStatusMessage(step.message);
      
      // Simulate progress within each step
      const startProgress = cumulativeProgress;
      const endProgress = startProgress + progressPerStep;
      
      const updateInterval = 100;
      const updates = step.duration / updateInterval;
      const incrementPerUpdate = progressPerStep / updates;
      
      for (let i = 0; i < updates; i++) {
        await new Promise(resolve => setTimeout(resolve, updateInterval));
        cumulativeProgress = Math.min(startProgress + (incrementPerUpdate * (i + 1)), endProgress);
        setProgress(cumulativeProgress);
      }
    }
    
    setProgress(100);
    setStatusMessage("Processing complete!");
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your cleaned video is being downloaded",
    });
    // In a real app, this would trigger the actual file download
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Clean Download</h2>
          <p className="text-statusshield-darkgray">
            Remove usernames and watermarks from social media videos
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-3">
            <Label htmlFor="video-url">Social Media Video URL</Label>
            <Input
              id="video-url"
              placeholder="https://www.tiktok.com/@username/video/1234567890"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="creator-name">Creator Name / Channel Name (Optional)</Label>
            <Input
              id="creator-name"
              placeholder="Enter channel or creator name to improve detection"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              disabled={isProcessing}
              className="w-full"
            />
            <p className="text-xs text-statusshield-darkgray">
              This helps us better detect and remove usernames from the video
            </p>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="status-shield">Status Shield</Label>
              <p className="text-sm text-statusshield-gray">
                Add a 2-second black screen at the beginning
              </p>
            </div>
            <Switch
              id="status-shield"
              checked={addBlackScreen}
              onCheckedChange={setAddBlackScreen}
              disabled={isProcessing}
            />
          </div>
          
          {isProcessing ? (
            <div className="space-y-4 py-2">
              <div className="flex justify-between text-sm">
                <span className="text-statusshield-darkgray">{statusMessage}</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>
          ) : processedVideoUrl ? (
            <div className="space-y-4 py-4">
              <div className="bg-statusshield-lightgray p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-statusshield-darkgray font-medium">
                    Video ready for download
                  </span>
                  <Button 
                    onClick={handleDownload}
                    className="bg-statusshield-purple text-statusshield-darkgray hover:bg-opacity-90"
                  >
                    <Download size={18} className="mr-2" />
                    Download Video
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
          
          <Button
            type="submit"
            disabled={isProcessing || !videoUrl.trim()}
            className="w-full bg-statusshield-purple text-black font-medium hover:bg-opacity-90"
          >
            {isProcessing ? (
              <>
                <Loader size={18} className="mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Clean & Process Video"
            )}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default CleanDownload;
