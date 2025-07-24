import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Ghost, Book, Eye, Moon, Image, Flame } from 'lucide-react';
import RitualIcon from '@/components/RitualIcon';
import legendsData from '@/data/legends.json';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// Default image map for legends - use same URLs as in LegendCollection
const imageMap = {
  1: '/images/legends/curupira.jpg', 
  2: '/images/legends/saci.jpg',
  3: '/images/legends/boitata.jpg',
  4: '/images/legends/loira-banheiro.jpg',
  5: '/images/legends/iara.jpg',
  6: '/images/legends/corpo-seco.jpg',
  // Add more as needed
};

const LegendCard = ({ legend }) => {
  return (
      <Card className="group bg-card text-card-foreground border-muted h-full flex flex-col card-hover animate-fade-in overflow-hidden">
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted/20 flex items-center justify-center overflow-hidden">
          <img 
            src={legend.image || imageMap[legend.id] || `/images/legends/default.jpg`} 
            alt={legend.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.classList.add('icon-fallback');
            }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
          {/* Icon as fallback - will show through the semi-transparent overlay */}
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
          <Button
            variant="ghost"
            className="text-aged-white/70 hover:bg-blood-red hover:text-aged-white p-0 flex items-center w-full justify-center transition-colors duration-200"
          >
            Ler história completa
            <Eye className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

const Explorar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('All');
  const regions = useMemo(() => ['All', ...Array.from(new Set(legendsData.legends.map(l => l.region).filter(Boolean)))], []);
  const filteredLegends = legendsData.legends.filter(l =>
    (region === 'All' || l.region === region) &&
    (l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center py-8 sm:py-12">
          <div className="w-full max-w-5xl mb-8 sm:mb-12">
            <div className="text-center mb-8 sm:mb-10">
              <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-aged-white mb-4">
                Explore Todas as Lendas
              </h1>
              <p className="font-lora text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Descubra as histórias que moldaram o imaginário brasileiro através dos séculos
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-px w-16 sm:w-24 bg-blood-red/50 self-center"></div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Buscar lendas..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-muted/20 text-aged-white placeholder:text-muted-foreground sm:w-64"
                />
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="bg-muted/20 text-aged-white placeholder:text-muted-foreground px-3 py-1 rounded w-32">
                    <SelectValue placeholder="Região" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" onClick={() => {
                const random = legendsData.legends[Math.floor(Math.random() * legendsData.legends.length)];
                navigate(`/ler-lenda/${random.id}`);
              }}>
                <Flame className="mr-2 h-4 w-4 text-blood-red" />
                Lenda Aleatória
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {filteredLegends.map((legend) => (
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
