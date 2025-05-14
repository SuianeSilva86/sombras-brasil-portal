
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  EyeOff, 
  VolumeX, 
  Moon,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilitySettingsProps {
  className?: string;
}

const AccessibilityControls: React.FC<AccessibilitySettingsProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    const stored = localStorage.getItem('a11y-reduced-motion');
    return stored ? JSON.parse(stored) : false;
  });
  const [highContrast, setHighContrast] = useState(() => {
    const stored = localStorage.getItem('a11y-high-contrast');
    return stored ? JSON.parse(stored) : false;
  });
  const [audioDisabled, setAudioDisabled] = useState(() => {
    const stored = localStorage.getItem('a11y-audio-disabled');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('a11y-reduced-motion', JSON.stringify(reducedMotion));
    document.documentElement.classList.toggle('reduce-motion', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('a11y-high-contrast', JSON.stringify(highContrast));
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('a11y-audio-disabled', JSON.stringify(audioDisabled));
    
    // Disable audio elements if setting is true
    const audioElement: HTMLAudioElement | null = document.getElementById('ambient-audio') as HTMLAudioElement;
    if (audioElement) {
      if (audioDisabled) {
        audioElement.pause();
      }
    }
  }, [audioDisabled]);

  return (
    <div className={cn("fixed bottom-4 left-4 z-50", className)}>
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-card border border-border hover:bg-card/80 focus:ring-2 focus:ring-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Configurações de acessibilidade"
        >
          <Settings size={18} className="text-foreground" />
        </Button>
        
        {isOpen && (
          <div className="absolute bottom-full mb-2 p-4 bg-card border border-border shadow-lg rounded-lg w-64 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-foreground">Acessibilidade</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                <X size={14} />
              </Button>
            </div>
            
            <div className="space-y-3">
              <Button
                variant={reducedMotion ? "default" : "outline"}
                className={cn(
                  "w-full justify-start text-left",
                  reducedMotion ? "bg-primary text-primary-foreground" : "bg-transparent"
                )}
                onClick={() => setReducedMotion(!reducedMotion)}
              >
                <EyeOff size={16} className="mr-2" />
                <span className="text-sm">Reduzir movimentos</span>
              </Button>
              
              <Button
                variant={highContrast ? "default" : "outline"}
                className={cn(
                  "w-full justify-start text-left",
                  highContrast ? "bg-primary text-primary-foreground" : "bg-transparent"
                )}
                onClick={() => setHighContrast(!highContrast)}
              >
                <Moon size={16} className="mr-2" />
                <span className="text-sm">Alto contraste</span>
              </Button>
              
              <Button
                variant={audioDisabled ? "default" : "outline"}
                className={cn(
                  "w-full justify-start text-left",
                  audioDisabled ? "bg-primary text-primary-foreground" : "bg-transparent"
                )}
                onClick={() => setAudioDisabled(!audioDisabled)}
              >
                <VolumeX size={16} className="mr-2" />
                <span className="text-sm">Desativar sons</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityControls;
