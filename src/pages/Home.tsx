
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import MediaUpload from "@/components/ui/MediaUpload";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-3">
            Hide your status previews
          </h2>
          <p className="text-statusshield-darkgray">
            Add a black screen before your media to keep your status private
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 cursor-pointer">
          <MediaUpload type="image" />
          <MediaUpload type="video" />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 text-statusshield-gray hover:text-statusshield-darkgray transition-colors"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
