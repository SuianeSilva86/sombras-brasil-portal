
import React, { useState } from 'react';
import Header from '@/components/Header';
import FeaturedLegend from '@/components/FeaturedLegend';
import LegendCollection from '@/components/LegendCollection';
import Footer from '@/components/Footer';
import RitualIcon from '@/components/RitualIcon';
import { Volume2, VolumeX } from 'lucide-react';

const AmbientParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
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

const Index = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  
  const toggleAudio = () => {
    const audioElement: HTMLAudioElement = document.getElementById('ambient-audio') as HTMLAudioElement;
    
    if (audioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <AmbientParticles />
      
      <audio id="ambient-audio" loop preload="none" className="hidden">
        <source src="https://freesound.org/data/previews/398/398655_4921277-lq.mp3" type="audio/mpeg" />
      </audio>
      
      <button
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 z-50 p-2 bg-card border border-muted rounded-full opacity-60 hover:opacity-100 transition-opacity"
        aria-label={audioPlaying ? "Desativar áudio ambiente" : "Ativar áudio ambiente"}
      >
        {audioPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      
      <div className="container mx-auto px-4 flex-grow flex flex-col relative z-10">
        <Header />
        <main className="flex-grow flex flex-col items-center">
          <FeaturedLegend />
          <LegendCollection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
