export const addBlackScreenToMedia = async (
  mediaFile: File,
  mediaType: "image" | "video",
  blackScreenDuration: number
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Canvas context not supported");

      const stream = canvas.captureStream(30);
      const chunks: Blob[] = [];

      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9"
      });

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(chunks, { type: "video/webm" });
        resolve(finalBlob);
      };

      // Start recording
      recorder.start(100);

      const renderBlack = () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      const drawForDuration = async (drawFn: () => void, durationMs: number) => {
        const fps = 60;
        const totalFrames = (durationMs / 1000) * fps;
        for (let i = 0; i < totalFrames; i++) {
          drawFn();
          await new Promise(r => setTimeout(r, 1000 / fps));
        }
      };

      // Black screen phase
      canvas.width = 360 ;
      canvas.height = 740;
      await drawForDuration(renderBlack, blackScreenDuration * 1000);

      if (mediaType === "image") {
        const img = new Image();
        img.onload = async () => {
          const aspectRatio = img.width / img.height;
          let drawWidth = canvas.width;
          let drawHeight = canvas.width / aspectRatio;

          if (drawHeight > canvas.height) {
            drawHeight = canvas.height;
            drawWidth = canvas.height * aspectRatio;
          }

          const x = (canvas.width - drawWidth) / 2;
          const y = (canvas.height - drawHeight) / 2;

          await drawForDuration(() => {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, drawWidth, drawHeight);
          }, 5000);

          recorder.stop();
        };

        img.onerror = () => reject("Failed to load image");
        img.src = URL.createObjectURL(mediaFile);
      } else {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(mediaFile);
        video.crossOrigin = "anonymous";
        video.muted = true;

        await new Promise<void>((resolveLoad, rejectLoad) => {
          video.onloadedmetadata = () => {
            canvas.width = video.videoWidth || 1280;
            canvas.height = video.videoHeight || 720;
            video.play();
            resolveLoad();
          };
          video.onerror = () => rejectLoad("Video failed to load");
        });

        const drawVideo = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          if (!video.ended) {
            requestAnimationFrame(drawVideo);
          } else {
            recorder.stop();
          }
        };

        drawVideo();
      }
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * Utility function to track and report processing progress
 * This uses a callback function to report progress
 * 
 * @param mediaFile The file being processed
 * @param onProgress Callback for progress updates (0-100)
 * @returns A simulated progress tracking Promise
 */
export const trackProcessingProgress = (
  mediaFile: File,
  onProgress: (progress: number) => void
): Promise<void> => {
  return new Promise((resolve) => {
    let progress = 0;
    const fileSize = mediaFile.size;
    const isLargeFile = fileSize > 5000000; // 5MB threshold
    
    // Adjust interval based on file size
    const interval = isLargeFile ? 300 : 200;
    
    // Adjust increment to make larger files seem to take more time
    const increment = isLargeFile ? 4 : 5;
    
    const timer = setInterval(() => {
      progress += increment;
      
      // Slow down progress as it gets closer to 100%
      if (progress >= 70) {
        progress += (increment / 2);
      }
      
      if (progress >= 95) {
        progress = 95; // Hold at 95% until processing completes
      }
      
      onProgress(Math.min(progress, 95));
      
      if (progress >= 95) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
};