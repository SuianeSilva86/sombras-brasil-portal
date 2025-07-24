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
import AccessibilityControls from "./components/AccessibilityControls";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const storedSetting = localStorage.getItem('a11y-reduced-motion');
    return storedSetting ? JSON.parse(storedSetting) : prefersReducedMotion;
  });

  // Update favicon and listen for accessibility changes
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


    const handleReducedMotionChange = () => {
      const reducedMotionSetting = localStorage.getItem('a11y-reduced-motion');
      const newSetting = reducedMotionSetting === 'true';
      setReducedMotion(newSetting);
    };

    window.addEventListener('storage', handleReducedMotionChange);

    return () => {
      window.removeEventListener('storage', handleReducedMotionChange);
    };
  }, [reducedMotion]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Skip link para acessibilidade por teclado */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        
        <TextureOverlay variant="paper" opacity={reducedMotion ? 0.02 : 0.05} />
        <HauntedBackground intensity="medium" reducedMotion={reducedMotion} />
        <AccessibilityControls />
        
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
