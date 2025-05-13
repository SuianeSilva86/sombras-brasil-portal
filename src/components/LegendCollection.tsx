
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RitualButton from '@/components/RitualButton';
import RitualIcon from '@/components/RitualIcon';
import { BookOpen, Star, Ghost, Book, User } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Mock de dados para lendas em destaque
const featuredLegends = [
  {
    id: 1,
    title: "Curupira",
    description: "Guardião da floresta, de pés invertidos, o Curupira vaga pelas matas brasileiras protegendo-a dos caçadores. Com cabelos vermelhos como fogo e pés virados para trás para confundir quem o persegue.",
    icon: <RitualIcon icon="star" className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Saci Pererê",
    description: "Um ser travesso, com uma perna só e uma carapuça mágica vermelha que lhe confere poderes extraordinários. Dizem que um redemoinho de vento anuncia sua chegada.",
    icon: <RitualIcon icon="moon" className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Corpo-Seco",
    description: "Alma penada que nem a terra quis. O Corpo-Seco é o espírito de uma pessoa tão má em vida que, após sua morte, foi rejeitado pela terra, pelo céu e pelo inferno.",
    icon: <RitualIcon icon="circle" className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

const LegendCard = ({ legend }) => {
  return (
    <Card className="bg-card text-card-foreground border-muted h-full flex flex-col relative group 
            hover:shadow-[0_0_15px_rgba(202,0,0,0.3)] hover:border-blood-red/30 transition-all duration-500
            overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"></div>
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={legend.image} 
            alt={legend.title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </AspectRatio>
        <div className="absolute top-2 right-2 p-1.5 bg-card/90 rounded-full">
          {legend.icon}
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
        <Link to={`/ler-lenda/${legend.id}`} className="w-full">
          <RitualButton 
            variant="ghost" 
            className="text-aged-white/70 hover:text-blood-red hover:bg-transparent p-0 w-full justify-center"
            icon={<RitualIcon icon="eye" />}
            iconPosition="right"
          >
            Desvendar Mistério
          </RitualButton>
        </Link>
      </CardFooter>
    </Card>
  );
};

const LegendCollection = () => {
  const [userLegends, setUserLegends] = useState([]);
  
  useEffect(() => {
    // Carregar lendas enviadas pelos usuários
    try {
      const savedLegends = JSON.parse(localStorage.getItem("legends") || "[]");
      setUserLegends(savedLegends.slice(0, 3).map(legend => ({
        id: legend.id,
        title: legend.title,
        description: legend.story.substring(0, 150) + "...",
        icon: <RitualIcon icon="key" className="text-blood-red" />,
        image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      })));
    } catch (error) {
      console.error("Erro ao carregar lendas:", error);
    }
  }, []);

  // Combine lendas em destaque com lendas dos usuários
  const displayLegends = [...featuredLegends, ...userLegends].slice(0, 6);

  return (
    <section className="w-full max-w-5xl mx-auto mb-16 px-4">
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-16 bg-blood-red/50"></div>
        <h2 className="font-playfair text-3xl px-4 text-center text-aged-white flex items-center">
          <RitualIcon icon="candle" className="mr-2 text-blood-red" size={20} />
          Lendas em Destaque
          <RitualIcon icon="candle" className="ml-2 text-blood-red" size={20} />
        </h2>
        <div className="h-px w-16 bg-blood-red/50"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayLegends.map((legend) => (
          <LegendCard key={legend.id} legend={legend} />
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Link to="/explorar">
          <RitualButton 
            variant="outline" 
            className="bg-transparent border border-blood-red/50 text-blood-red hover:bg-blood-red/10"
            icon={<RitualIcon icon="seal" />}
          >
            Desvendar Todos os Ecos
          </RitualButton>
        </Link>
      </div>
    </section>
  );
};

export default LegendCollection;
