
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Ghost, Book, Eye, Moon, Image, Flame } from 'lucide-react';

const legends = [
  {
    id: 1,
    title: "Curupira",
    region: "Amazônia",
    description: "Guardião da floresta, de pés invertidos, o Curupira vaga pelas matas brasileiras protegendo-a dos caçadores. Com cabelos vermelhos como fogo e pés virados para trás para confundir quem o persegue.",
    icon: <Star className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Saci Pererê",
    region: "Todo o Brasil",
    description: "Um ser travesso, com uma perna só e uma carapuça mágica vermelha que lhe confere poderes extraordinários. Dizem que um redemoinho de vento anuncia sua chegada.",
    icon: <Ghost className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Corpo-Seco",
    region: "Minas Gerais",
    description: "Alma penada que nem a terra quis. O Corpo-Seco é o espírito de uma pessoa tão má em vida que, após sua morte, foi rejeitado pela terra, pelo céu e pelo inferno.",
    icon: <Book className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Loira do Banheiro",
    region: "Escolas brasileiras",
    description: "Uma das lendas urbanas mais icônicas do Brasil, a história de uma garota de longos cabelos loiros que assombra os banheiros das escolas.",
    icon: <Moon className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Iara",
    region: "Região Norte",
    description: "Sereia brasileira que encanta os homens com seu canto e beleza, atraindo-os para as profundezas dos rios.",
    icon: <Image className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Mula Sem Cabeça",
    region: "Interior do Brasil",
    description: "Mulher que foi amaldiçoada e transformada em uma mula sem cabeça que cospe fogo pelas narinas, punida por ter se envolvido com um padre.",
    icon: <Flame className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

const LegendCard = ({ legend }) => {
  return (
    <Card className="bg-card text-card-foreground border-muted h-full flex flex-col card-hover animate-fade-in overflow-hidden">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={legend.image} 
            alt={legend.title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </AspectRatio>
        <div className="absolute top-2 right-2 p-1.5 bg-card/90 rounded-full">
          {legend.icon}
        </div>
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-blood-red/80 text-aged-white text-xs rounded">
          {legend.region}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="font-playfair text-xl text-blood-red flex items-center">
          {legend.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-inter text-aged-white/80 text-sm leading-relaxed">
          {legend.description}
        </p>
      </CardContent>
      <CardFooter className="pt-2 border-t border-muted/30">
        <Button variant="ghost" className="text-aged-white/70 hover:text-blood-red hover:bg-transparent p-0 flex items-center w-full justify-center">
          Ler história completa
          <Eye className="ml-2 h-4 w-4 animate-float" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Explorar = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center py-12">
          <div className="w-full max-w-5xl mb-12">
            <div className="text-center mb-10">
              <h1 className="font-playfair text-3xl md:text-4xl text-aged-white mb-4">
                Explore Todas as Lendas
              </h1>
              <p className="font-lora text-muted-foreground max-w-2xl mx-auto">
                Descubra as histórias que moldaram o imaginário brasileiro através dos séculos
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-px w-24 bg-blood-red/50 self-center"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {legends.map((legend) => (
                <LegendCard key={legend.id} legend={legend} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Explorar;
