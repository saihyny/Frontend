
import React, { createContext, useContext, useState } from "react";

interface MediaContextType {
  media: File | null;
  setMedia: React.Dispatch<React.SetStateAction<File | null>>;
  mediaType: "image" | "video" | null;
  setMediaType: React.Dispatch<React.SetStateAction<"image" | "video" | null>>;
  processedMedia: string | null;
  setProcessedMedia: React.Dispatch<React.SetStateAction<string | null>>;
  blackScreenDuration: number;
  setBlackScreenDuration: React.Dispatch<React.SetStateAction<number>>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [media, setMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [processedMedia, setProcessedMedia] = useState<string | null>(null);
  const [blackScreenDuration, setBlackScreenDuration] = useState<number>(2); // Default 2 seconds

  return (
    <MediaContext.Provider 
      value={{
        media,
        setMedia,
        mediaType,
        setMediaType,
        processedMedia,
        setProcessedMedia,
        blackScreenDuration,
        setBlackScreenDuration
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
