
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Ghost, Book } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const legends = [
  {
    id: 1,
    title: "Curupira",
    description: "Guardião da floresta, de pés invertidos, o Curupira vaga pelas matas brasileiras protegendo-a dos caçadores. Com cabelos vermelhos como fogo e pés virados para trás para confundir quem o persegue.",
    icon: <Star className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Saci Pererê",
    description: "Um ser travesso, com uma perna só e uma carapuça mágica vermelha que lhe confere poderes extraordinários. Dizem que um redemoinho de vento anuncia sua chegada.",
    icon: <Ghost className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Corpo-Seco",
    description: "Alma penada que nem a terra quis. O Corpo-Seco é o espírito de uma pessoa tão má em vida que, após sua morte, foi rejeitado pela terra, pelo céu e pelo inferno.",
    icon: <Book className="text-blood-red" />,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
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
          Ler mais
          <BookOpen className="ml-2 h-4 w-4 animate-float" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const LegendCollection = () => {
  return (
    <section className="w-full max-w-5xl mx-auto mb-16 px-4">
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-16 bg-blood-red/50"></div>
        <h2 className="font-playfair text-3xl px-4 text-center text-aged-white">
          Lendas em Destaque
        </h2>
        <div className="h-px w-16 bg-blood-red/50"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legends.map((legend) => (
          <LegendCard key={legend.id} legend={legend} />
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Link to="/explorar">
          <Button 
            variant="outline" 
            className="bg-transparent border border-blood-red/50 text-blood-red hover:bg-blood-red/10 group"
          >
            Explorar todas as lendas
            <BookOpen className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LegendCollection;
