
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import RitualButton from '@/components/RitualButton';
import RitualIcon from '@/components/RitualIcon';
import { ArrowLeft, User, BookOpen, VolumeX, Volume2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MysticalTypingEffect from '@/components/MysticalTypingEffect';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

interface Lenda {
  id: number;
  authorType: string;
  authorName: string;
  title: string;
  story: string;
  createdAt: string;
}

const LerLenda = () => {
  const { id } = useParams<{ id: string }>();
  const [lenda, setLenda] = useState<Lenda | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [revealStory, setRevealStory] = useState<boolean>(false);
  const [paragraphIndex, setParagraphIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState(() => {
    const stored = localStorage.getItem('a11y-reduced-motion');
    return stored ? JSON.parse(stored) : false;
  });
  
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const pageEventAudioRef = useRef<HTMLAudioElement | null>(null);
  const storyContentRef = useRef<HTMLDivElement | null>(null);
  const currentParagraphRef = useRef<HTMLParagraphElement | null>(null);

  // Load legend data
  useEffect(() => {
    setLoading(true);
    try {
      const legends = JSON.parse(localStorage.getItem("legends") || "[]");
      const found = legends.find((l: Lenda) => l.id === Number(id));
      setLenda(found || null);
      
      // Reset state when loading a new legend
      setRevealStory(false);
      setParagraphIndex(0);
      
    } catch (error) {
      console.error("Erro ao buscar lenda:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Start revealing the story after a short delay
  useEffect(() => {
    if (lenda && !revealStory) {
      const timer = setTimeout(() => {
        setRevealStory(true);
        // Play mystical sound when revealing the story
        if (soundEnabled && pageEventAudioRef.current) {
          pageEventAudioRef.current.src = "https://freesound.org/data/previews/527/527741_5479102-lq.mp3"; // page turning sound
          pageEventAudioRef.current.volume = 0.4;
          pageEventAudioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }
      }, reducedMotion ? 500 : 2000);
      return () => clearTimeout(timer);
    }
  }, [lenda, revealStory, soundEnabled, reducedMotion]);

  // Gradually reveal paragraphs with timing based on paragraph length
  useEffect(() => {
    if (lenda && revealStory) {
      const paragraphs = lenda.story.split("\n").filter(p => p.trim() !== "");
      
      if (paragraphIndex < paragraphs.length - 1) {
        // Calculate reveal time based on paragraph length (longer paragraphs get more time)
        const currentParagraph = paragraphs[paragraphIndex];
        const baseDelay = reducedMotion ? 500 : 2000;
        const wordsPerMinute = 200; // Average reading speed
        const wordCount = currentParagraph.split(/\s+/).length;
        const readingTimeMs = (wordCount / wordsPerMinute) * 60 * 1000;
        const revealDelay = Math.max(baseDelay, readingTimeMs * 0.7); // At least baseDelay, but longer for longer paragraphs
        
        const timer = setTimeout(() => {
          setParagraphIndex(prev => prev + 1);
          
          // Play soft ambient sound when revealing new paragraph
          if (soundEnabled && pageEventAudioRef.current) {
            pageEventAudioRef.current.src = "https://freesound.org/data/previews/367/367480_1324266-lq.mp3"; // soft page turn
            pageEventAudioRef.current.volume = 0.2;
            pageEventAudioRef.current.play().catch(e => console.error("Error playing audio:", e));
          }
          
        }, revealDelay);
        
        return () => clearTimeout(timer);
      }
    }
  }, [lenda, revealStory, paragraphIndex, reducedMotion]);

  // Auto-scroll to the current paragraph
  useEffect(() => {
    if (autoScroll && currentParagraphRef.current && storyContentRef.current) {
      currentParagraphRef.current.scrollIntoView({ 
        behavior: reducedMotion ? 'auto' : 'smooth', 
        block: 'center' 
      });
    }
  }, [paragraphIndex, autoScroll, reducedMotion]);

  // Handle audio enabling/disabling
  useEffect(() => {
    if (soundEnabled) {
      // Start ambient background audio
      if (ambientAudioRef.current) {
        ambientAudioRef.current.volume = 0.1;
        ambientAudioRef.current.loop = true;
        ambientAudioRef.current.play().catch(e => {
          console.error("Error playing ambient audio:", e);
          toast({
            title: "Não foi possível reproduzir o áudio",
            description: "Verifique se seu navegador permite reprodução de áudio",
            variant: "destructive"
          });
          setSoundEnabled(false);
        });
      }
    } else {
      // Stop all audio
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current.currentTime = 0;
      }
      if (pageEventAudioRef.current) {
        pageEventAudioRef.current.pause();
        pageEventAudioRef.current.currentTime = 0;
      }
    }
    
    // Check if audio is disabled in accessibility settings
    const audioDisabled = localStorage.getItem('a11y-audio-disabled');
    if (audioDisabled === 'true' && soundEnabled) {
      setSoundEnabled(false);
    }
    
    return () => {
      // Clean up audio when component unmounts
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current.currentTime = 0;
      }
      if (pageEventAudioRef.current) {
        pageEventAudioRef.current.pause();
        pageEventAudioRef.current.currentTime = 0;
      }
    };
  }, [soundEnabled]);

  // Handle toggle audio
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    if (!soundEnabled) {
      toast({
        title: "Sons ativados",
        description: "Áudio atmosférico adicionado à sua experiência",
      });
    }
  };

  // Showing loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="container mx-auto px-4 flex-grow">
          <Header />
          <main className="flex-grow flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <RitualIcon icon="seal" className="animate-spin text-blood-red" size={24} />
              <p className="text-aged-white italic font-lora">Invocando história...</p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // Error if legend not found
  if (!lenda) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="container mx-auto px-4 flex-grow">
          <Header />
          <main className="flex-grow flex flex-col items-center justify-center py-12">
            <h1 className="font-playfair text-3xl text-aged-white mb-4">Lenda não encontrada</h1>
            <p className="text-muted-foreground mb-6">A história que você procura parece não existir...</p>
            <Link to="/explorar">
              <RitualButton 
                variant="outline" 
                className="border-blood-red/50 text-blood-red hover:bg-blood-red/10"
                icon={<RitualIcon icon="eye" />}
              >
                Retornar aos Ecos
              </RitualButton>
            </Link>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  const paragraphs = lenda.story.split("\n").filter(p => p.trim() !== "");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        
        <main className="flex-grow py-8">
          <div className="max-w-4xl mx-auto">
            {/* Navigation and controls */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/explorar">
                <RitualButton 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-aged-white group"
                  icon={<ArrowLeft className="h-5 w-5 mr-1.5" />}
                >
                  Retornar
                </RitualButton>
              </Link>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleSound} 
                  className={cn(
                    "flex items-center justify-center p-2 rounded-full transition-colors",
                    soundEnabled 
                      ? "bg-blood-red/20 text-blood-red hover:bg-blood-red/30" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                  title={soundEnabled ? "Desativar sons" : "Ativar sons"}
                >
                  {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* Title and Author info */}
            <div className="mb-8 animate-fade-in">
              <h1 className="font-playfair text-3xl md:text-4xl text-aged-white mb-4">
                {lenda.title}
              </h1>
              
              <div className="flex items-center text-muted-foreground text-sm">
                <div className="flex items-center mr-4">
                  <User className="h-4 w-4 mr-1.5" />
                  <span>{lenda.authorName}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  <span>{new Date(lenda.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
              
              <div className="mt-4 h-px w-32 bg-blood-red/50"></div>
            </div>
            
            {/* Mystical quote before story */}
            <div className={cn(
              "text-center italic font-lora text-aged-white/70 my-8 transition-opacity duration-1000",
              revealStory ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
            )}>
              <MysticalTypingEffect 
                text="Dizem que esta história nunca deveria ser contada..." 
                className="text-lg"
              />
            </div>
            
            {/* Story content with scroll area */}
            <div ref={storyContentRef} className="bg-card border border-muted rounded-lg p-6 md:p-8 shadow-lg mb-6">
              <ScrollArea className="h-[60vh] pr-4">
                <div className="prose prose-invert max-w-none">
                  {revealStory && paragraphs.map((paragraph, index) => {
                    const isCurrentParagraph = index === paragraphIndex;
                    
                    return (
                      <p 
                        key={index} 
                        ref={isCurrentParagraph ? currentParagraphRef : null}
                        className={cn(
                          "font-lora text-aged-white/90 mb-6 leading-relaxed transition-all duration-1000",
                          index <= paragraphIndex ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
                          isCurrentParagraph && "border-l-2 border-blood-red/30 pl-4 bg-card/50"
                        )}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                  
                  {/* Show a progress note at the end */}
                  {revealStory && paragraphIndex >= paragraphs.length - 1 && (
                    <div className="text-center text-aged-white/60 italic mt-8 font-lora">
                      ~ Fim da história ~
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            
            {/* Audio elements */}
            <audio ref={ambientAudioRef} preload="none">
              <source src="https://freesound.org/data/previews/572/572986_7031081-lq.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={pageEventAudioRef} preload="none"></audio>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default LerLenda;
