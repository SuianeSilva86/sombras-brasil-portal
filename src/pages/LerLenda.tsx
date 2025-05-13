
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="container mx-auto px-4 flex-grow">
          <Header />
          <main className="flex-grow flex items-center justify-center py-12">
            <p className="text-aged-white">Carregando...</p>
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
              <Button variant="outline" className="border-blood-red/50 text-blood-red hover:bg-blood-red/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Explorar
              </Button>
            </Link>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/explorar">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-aged-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            
            <div className="mb-8">
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
            
            <div className="bg-card border border-muted rounded-lg p-6 md:p-8 shadow-lg">
              <div className="prose prose-invert max-w-none">
                {lenda.story.split("\n").map((paragraph, index) => (
                  <p key={index} className="font-lora text-aged-white/90 mb-4 leading-relaxed">
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
