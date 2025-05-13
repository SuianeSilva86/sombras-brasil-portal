
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explorar from "./pages/Explorar";
import Enviar from "./pages/Enviar";
import LerLenda from "./pages/LerLenda";
import NotFound from "./pages/NotFound";
import TextureOverlay from "./components/TextureOverlay";
import HauntedBackground from "./components/HauntedBackground";
import HauntedCursor from "./components/HauntedCursor";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Update favicon
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = "/favicon-scary.svg";
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = "/favicon-scary.svg";
      document.head.appendChild(newLink);
    }
    
    // Add scary cursor style
    document.body.classList.add("cursor-none");
    
    return () => {
      document.body.classList.remove("cursor-none");
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TextureOverlay variant="paper" opacity={0.05} />
        <HauntedBackground />
        <HauntedCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/enviar" element={<Enviar />} />
            <Route path="/ler-lenda/:id" element={<LerLenda />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
