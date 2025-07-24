import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RitualButton from '@/components/RitualButton';
import RitualIcon from '@/components/RitualIcon';
import { BookOpen, Star, Ghost, Book, User } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import legendsData from '@/data/legends.json';

// Default image map for legends - replace these URLs with your actual image paths
const imageMap = {
  1: '/images/legends/curupira.jpg', 
  2: '/images/legends/saci.jpg',
  3: '/images/legends/boitata.jpg',
  4: '/images/legends/loira-banheiro.jpg',
  5: '/images/legends/iara.jpg',
  6: '/images/legends/corpo-seco.jpg',
  // Add more as needed
};

// Placeholder images for user-submitted legends
const placeholderImages = [
  '/images/legends/placeholder-1.jpg',
  '/images/legends/placeholder-2.jpg',
  '/images/legends/placeholder-3.jpg',
];

const LegendCard = ({ legend }) => {
  return (
    <Card className="bg-card text-card-foreground border-muted h-full flex flex-col relative group 
            hover:shadow-[0_0_15px_rgba(202,0,0,0.3)] hover:border-blood-red/30 transition-all duration-500
            overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"></div>
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted/20 flex items-center justify-center overflow-hidden">
          {legend.image ? (
            <img 
              src={legend.image} 
              alt={legend.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <RitualIcon icon={legend.iconName || 'star'} size={64} className="text-blood-red/50 animate-pulse-soft" />
          )}
          {legend.image && (
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
          )}
        </AspectRatio>
        {legend.region && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-blood-red/80 text-aged-white text-xs rounded">
            {legend.region}
          </div>
        )}
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
      setUserLegends(savedLegends.slice(0, 2).map((legend, index) => ({
        id: legend.id,
        title: legend.title,
        description: legend.story.substring(0, 150) + "...",
        iconName: 'key',
        // Add a placeholder image for user legends
        image: placeholderImages[index % placeholderImages.length],
      })));
    } catch (error) {
      console.error("Erro ao carregar lendas:", error);
    }
  }, []);

  // Get featured legends from JSON data (first 4) and combine with user legends
  const featuredLegends = legendsData.legends.slice(0, 4).map(legend => ({
    ...legend,
    // Use image property directly, it already exists in the data
  }));
  
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
            Ver todas as lendas
          </RitualButton>
        </Link>
      </div>
    </section>
  );
};

export default LegendCollection;

