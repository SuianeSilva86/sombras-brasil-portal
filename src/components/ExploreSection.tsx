
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface LegendCardProps {
  title: string;
  description: string;
  delay: string;
}

const LegendCard = ({ title, description, delay }: LegendCardProps) => {
  return (
    <Card className="bg-card text-card-foreground border-muted h-full flex flex-col card-hover animate-fade-in" style={{ animationDelay: delay }}>
      <CardHeader>
        <CardTitle className="font-playfair text-xl text-blood-red">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="font-inter text-aged-white/80 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="text-aged-white/70 hover:text-blood-red hover:bg-transparent p-0 flex items-center">
          Ler mais
          <BookOpen className="ml-2 h-4 w-4 animate-float" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const ExploreSection = () => {
  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4">
      <h2 className="font-playfair text-2xl md:text-3xl mb-8 text-center text-aged-white">
        Explorar
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <LegendCard
          title="Curupira"
          description="Guardião da floresta, de pés invertidos, o Curupira vaga pelas matas brasileiras protegendo-a dos caçadores. Com cabelos vermelhos como fogo e pés virados para trás para confundir quem o persegue, este ser mítico anuncia sua presença com assobios agudos."
          delay="0.6s"
        />
        <LegendCard
          title="Saci"
          description="Um ser travesso, com uma perna só e uma carapuça mágica vermelha que lhe confere poderes extraordinários. Dizem que um redemoinho de vento anuncia sua chegada, e que ele é responsável por objetos que desaparecem e pequenos acidentes domésticos."
          delay="0.8s"
        />
        <LegendCard
          title="Corpo-Seco"
          description="Alma penada que nem a terra quis. O Corpo-Seco é o espírito de uma pessoa tão má em vida que, após sua morte, foi rejeitado pela terra, pelo céu e pelo inferno. Condenado a vagar eternamente, é descrito como um ser esquelético com pele ressecada."
          delay="1.0s"
        />
      </div>
    </section>
  );
};

export default ExploreSection;
