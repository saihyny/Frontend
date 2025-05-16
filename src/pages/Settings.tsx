
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useMedia } from "@/context/MediaContext";
import ActionButton from "@/components/ui/ActionButton";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const { blackScreenDuration, setBlackScreenDuration } = useMedia();
  const navigate = useNavigate();
  
  const handleDurationChange = (value: number[]) => {
    setBlackScreenDuration(value[0]);
  };

  const handleSave = () => {
    toast.success("Settings saved", {
      description: `Black screen duration set to ${blackScreenDuration} seconds.`
    });
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Black Screen Duration</h3>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Duration: {blackScreenDuration} seconds</span>
              </div>
              <Slider 
                value={[blackScreenDuration]}
                min={1}
                max={5}
                step={1}
                onValueChange={handleDurationChange}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-statusshield-gray">
                <span>1s</span>
                <span>5s</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm text-statusshield-darkgray mb-4">
              StatusShield helps you protect your privacy by adding a black screen to your media before sharing it to WhatsApp Status.
            </p>
            <p className="text-sm text-statusshield-gray">
              Version 1.0.0
            </p>
          </div>
        </div>
        
        <ActionButton onClick={handleSave}>
          Save Settings
        </ActionButton>
      </div>
    </AppLayout>
  );
};

export default Settings;
