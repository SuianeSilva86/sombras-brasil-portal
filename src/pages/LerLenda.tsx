import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import RitualButton from '@/components/RitualButton';
import RitualIcon from '@/components/RitualIcon';
import { ArrowLeft, User, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MysticalTypingEffect from '@/components/MysticalTypingEffect';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import legendsData from '@/data/legends.json';

interface Lenda {
  id: number;
  authorType: string;
  authorName: string;
  title: string;
  story: string;
  createdAt: string;
  region?: string;
  description?: string;
}

export const LerLenda = () => {
  const { id } = useParams<{ id: string }>();
  const [lenda, setLenda] = useState<Lenda | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [revealStory, setRevealStory] = useState<boolean>(false);
  const [paragraphIndex, setParagraphIndex] = useState<number>(0);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState(() => {
    const stored = localStorage.getItem('a11y-reduced-motion');
    return stored ? JSON.parse(stored) : false;
  });
  
  const storyContentRef = useRef<HTMLDivElement | null>(null);
  const currentParagraphRef = useRef<HTMLParagraphElement | null>(null);

  // Load legend data
  useEffect(() => {
    setLoading(true);
    try {
      // First try to find in traditional legends from JSON
      const traditionalLegend = legendsData.legends.find((l: any) => l.id === Number(id));
      
      if (traditionalLegend) {
        setLenda(traditionalLegend);
      } else {
        // Fallback to user-submitted legends in localStorage
        const legends = JSON.parse(localStorage.getItem("legends") || "[]");
        const found = legends.find((l: Lenda) => l.id === Number(id));
        setLenda(found || null);
      }
      
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
      }, reducedMotion ? 500 : 2000);
      return () => clearTimeout(timer);
    }
  }, [lenda, revealStory, reducedMotion]);

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
        
        <main className="flex-grow py-6 sm:py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Navigation and controls */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <Link to="/explorar">
                <RitualButton 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-aged-white group"
                  icon={<ArrowLeft className="h-5 w-5 mr-1.5" />}
                >
                  Retornar
                </RitualButton>
              </Link>
            </div>
            
            {/* Title and Author info */}
            <div className="mb-6 sm:mb-8 animate-fade-in">
              <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-aged-white mb-4">
                {lenda.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-muted-foreground text-sm sm:text-base">
                <div className="flex items-center mr-4 mb-2 sm:mb-0">
                  <User className="h-4 w-4 mr-1.5" />
                  <span>{lenda.authorName}</span>
                </div>
                <div className="flex items-center mr-4 mb-2 sm:mb-0">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  <span>{new Date(lenda.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
                {lenda.region && (
                  <div className="flex items-center">
                    <RitualIcon icon="star" className="h-4 w-4 mr-1.5" />
                    <span>{lenda.region}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 h-px w-24 bg-blood-red/50"></div>
            </div>
            
            {/* Mystical quote before story */}
            <div className={cn(
              "text-center italic font-lora text-aged-white/70 my-6 sm:my-8 transition-opacity duration-1000",
              revealStory ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
            )}>
              <MysticalTypingEffect 
                text="Dizem que esta história nunca deveria ser contada..." 
                className="text-base sm:text-lg"
              />
            </div>
            
            {/* Story content with scroll area */}
            <div ref={storyContentRef} className="bg-card border border-muted rounded-lg p-4 sm:p-6 shadow-lg mb-6">
              <ScrollArea className="h-[50vh] sm:h-[60vh] pr-2 sm:pr-4">
                <div className="prose prose-invert max-w-none">
                  {revealStory && paragraphs.map((paragraph, index) => {
                    const isCurrentParagraph = index === paragraphIndex;
                    
                    return (
                      <p 
                        key={index} 
                        ref={isCurrentParagraph ? currentParagraphRef : null}
                        className={cn(
                          "font-lora text-aged-white/90 mb-4 sm:mb-6 leading-relaxed transition-all duration-1000",
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
                    <div className="text-center text-aged-white/60 italic mt-6 sm:mt-8 font-lora">
                      ~ Fim da história ~
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default LerLenda;
