
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeaturedLegend from '@/components/FeaturedLegend';
import LegendCollection from '@/components/LegendCollection';
import Footer from '@/components/Footer';
import ScaryText from '@/components/ScaryText';
import { Volume2, VolumeX } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const AmbientParticles = ({ reduced = false }) => {
  if (reduced) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30" aria-hidden="true">
      <div className="absolute w-full h-full">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Creepy whispers that appear and disappear, now with accessibility controls
const CreepyWhispers = ({ reduced = false }) => {
  const whispers = [
    "não olhe para trás...",
    "eles estão te observando...",
    "você ouviu isso?",
    "ela vem à meia-noite...",
    "sussurros na escuridão...",
    "nunca saia sozinho...",
  ];
  
  const [visibleWhisper, setVisibleWhisper] = useState<number | null>(null);
  
  useEffect(() => {
    if (reduced) return;
    
    const showRandomWhisper = () => {
      if (Math.random() > 0.7) {
        setVisibleWhisper(Math.floor(Math.random() * whispers.length));
        
        setTimeout(() => {
          setVisibleWhisper(null);
        }, 4000);
      } else {
        setVisibleWhisper(null);
      }
    };
    
    const interval = setInterval(showRandomWhisper, 10000);
    return () => clearInterval(interval);
  }, [reduced]);
  
  if (visibleWhisper === null) return null;
  
  return (
    <div className="fixed pointer-events-none z-20 inset-0 flex items-center justify-center" aria-hidden="true">
      <p 
        className="text-blood-red/70 font-lora italic text-lg animate-mystical-fade"
        style={{
          position: 'absolute',
          top: `${Math.random() * 70 + 15}%`,
          left: `${Math.random() * 70 + 15}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {whispers[visibleWhisper]}
      </p>
    </div>
  );
};

// Jumpscare component that shows rarely
const RandomJumpscare = ({ reduced = false }) => {
  const [showJumpscare, setShowJumpscare] = useState(false);

  useEffect(() => {
    if (reduced) return;

    // Very low chance of jumpscare
    const interval = setInterval(() => {
      // 1% chance every 30 seconds
      if (Math.random() < 0.01) {
        setShowJumpscare(true);
        setTimeout(() => {
          setShowJumpscare(false);
        }, 300);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [reduced]);

  if (!showJumpscare) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
      style={{
        animation: 'jumpscare 0.3s ease-out forwards'
      }}
    >
      <div className="p-4">
        <RitualIcon icon="ghost" size={160} className="text-blood-red" />
      </div>
    </div>
  );
};

const Index = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [reducedEffects, setReducedEffects] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Verifica preferências de usuário
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const storedSetting = localStorage.getItem('a11y-reduced-motion');
    const shouldReduceEffects = storedSetting ? JSON.parse(storedSetting) : prefersReducedMotion;
    setReducedEffects(shouldReduceEffects);
    
    // Verifica se devemos desabilitar o áudio por padrão
    const audioDisabled = localStorage.getItem('a11y-audio-disabled');
    if (audioDisabled === 'false') {
      const audioElement: HTMLAudioElement = document.getElementById('ambient-audio') as HTMLAudioElement;
      if (audioElement) {
        audioElement.volume = 0.3; // Volume mais baixo por padrão
        audioElement.play()
          .then(() => setAudioPlaying(true))
          .catch(() => console.log("Reprodução de áudio bloqueada pelo navegador"));
      }
    }
    
    // Monitora mudanças nas configurações de acessibilidade
    const handleSettingsChange = () => {
      const reducedMotion = localStorage.getItem('a11y-reduced-motion');
      setReducedEffects(reducedMotion === 'true');
      
      const audioDisabled = localStorage.getItem('a11y-audio-disabled');
      if (audioDisabled === 'true' && audioPlaying) {
        const audioElement: HTMLAudioElement = document.getElementById('ambient-audio') as HTMLAudioElement;
        if (audioElement) {
          audioElement.pause();
          setAudioPlaying(false);
        }
      }
    };
    
    window.addEventListener('storage', handleSettingsChange);
    document.addEventListener('a11y-settings-changed', handleSettingsChange);

    // Simular carregamento da página para efeito de suspense
    setTimeout(() => {
      setIsLoading(false);
      if (!reducedEffects) {
        setTimeout(() => {
          toast({
            title: "Um espírito se aproxima...",
            description: "Sinta a presença das sombras ao seu redor.",
            className: "bg-background border-blood-red text-blood-red",
          });
        }, 3000);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleSettingsChange);
      document.removeEventListener('a11y-settings-changed', handleSettingsChange);
    };
  }, [audioPlaying]);
  
  const toggleAudio = () => {
    const audioElement: HTMLAudioElement = document.getElementById('ambient-audio') as HTMLAudioElement;
    
    if (audioPlaying) {
      audioElement.pause();
      localStorage.setItem('a11y-audio-disabled', 'true');
    } else {
      audioElement.play().catch(err => console.error("Erro ao reproduzir áudio:", err));
      localStorage.setItem('a11y-audio-disabled', 'false');
    }
    
    setAudioPlaying(!audioPlaying);
    document.dispatchEvent(new Event('a11y-settings-changed'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <AmbientParticles reduced={reducedEffects} />
      <CreepyWhispers reduced={reducedEffects} />
      <RandomJumpscare reduced={reducedEffects} />
      
      <audio 
        id="ambient-audio" 
        loop 
        preload="none" 
        className="hidden"
        aria-label="Áudio ambiente de atmosfera assustadora"
      >
        <source src="https://freesound.org/data/previews/398/398655_4921277-lq.mp3" type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
      
      <button
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 z-50 p-2 bg-card border border-muted rounded-full opacity-60 hover:opacity-100 transition-opacity focus:ring-2 focus:ring-primary focus:outline-none"
        aria-label={audioPlaying ? "Desativar áudio ambiente" : "Ativar áudio ambiente"}
      >
        {audioPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      
      <div id="main-content" className="container mx-auto px-4 flex-grow flex flex-col relative z-10">
        <Header />
        
        {isLoading ? (
          <div className="flex-grow flex flex-col items-center animate-pulse">
            <div className="w-full text-center my-6">
              <Skeleton className="h-10 w-64 mx-auto mb-2" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
            <Skeleton className="h-80 w-full max-w-5xl mx-auto mb-12 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              <Skeleton className="h-64 rounded-lg" />
              <Skeleton className="h-64 rounded-lg" />
              <Skeleton className="h-64 rounded-lg" />
            </div>
          </div>
        ) : (
          <main className="flex-grow flex flex-col items-center">
            <div className="w-full text-center my-6">
              <ScaryText 
                text="Bem-vindo às Sombras do Brasil" 
                className="font-playfair text-3xl md:text-4xl text-blood-red"
                respectReducedMotion={true}
              />
              <p className="font-lora text-aged-white/70 mt-2 italic">
                onde os pesadelos ganham vida e as lendas nunca morrem
              </p>
            </div>
            <FeaturedLegend />
            <LegendCollection />
          </main>
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
