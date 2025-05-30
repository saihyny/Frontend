
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import Processing from "./pages/Processing";
import Success from "./pages/Success";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CleanDownload from "./pages/CleanDownload";
import { MediaProvider } from "./context/MediaContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MediaProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/success" element={<Success />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/clean-download" element={<CleanDownload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MediaProvider>
  </QueryClientProvider>
);

export default App;
