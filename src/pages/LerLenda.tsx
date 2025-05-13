
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RitualButton from '@/components/RitualButton';
import RitualIcon from '@/components/RitualIcon';
import { ArrowLeft, User, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MysticalTypingEffect from '@/components/MysticalTypingEffect';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    // Em um cenário real, buscaria da API
    setLoading(true);
    try {
      const legends = JSON.parse(localStorage.getItem("legends") || "[]");
      const found = legends.find((l: Lenda) => l.id === Number(id));
      setLenda(found || null);
    } catch (error) {
      console.error("Erro ao buscar lenda:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Start revealing the story after a short delay
    if (lenda && !revealStory) {
      const timer = setTimeout(() => {
        setRevealStory(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lenda, revealStory]);

  useEffect(() => {
    // Gradually reveal paragraphs
    if (lenda && revealStory) {
      const paragraphs = lenda.story.split("\n");
      if (paragraphIndex < paragraphs.length - 1) {
        const timer = setTimeout(() => {
          setParagraphIndex(prev => prev + 1);
        }, 2000); // Adjust timing as desired
        return () => clearTimeout(timer);
      }
    }
  }, [lenda, revealStory, paragraphIndex]);

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

  const paragraphs = lenda.story.split("\n");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/explorar">
              <RitualButton 
                variant="ghost" 
                className="mb-6 text-muted-foreground hover:text-aged-white group"
                icon={<RitualIcon icon="eye" />}
              >
                Retornar
              </RitualButton>
            </Link>
            
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
            
            {/* Mystical quote */}
            <div className={cn(
              "text-center italic font-lora text-aged-white/70 my-6 transition-opacity duration-1000",
              revealStory ? "opacity-0" : "opacity-100"
            )}>
              <MysticalTypingEffect 
                text="Dizem que esta história nunca deveria ser contada..." 
                className="text-lg"
              />
            </div>
            
            <div className="bg-card border border-muted rounded-lg p-6 md:p-8 shadow-lg">
              <div className="prose prose-invert max-w-none">
                {revealStory && paragraphs.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className={cn(
                      "font-lora text-aged-white/90 mb-4 leading-relaxed transition-all duration-1000",
                      index <= paragraphIndex ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LerLenda;
