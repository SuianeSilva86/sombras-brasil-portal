import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RitualButton from '@/components/RitualButton';
import RitualIcon from '@/components/RitualIcon';
import ScaryText from '@/components/ScaryText';
import { Eye } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import legendsData from '@/data/legends.json';

// Default featured legend image
const featuredLegendImage = '/images/legends/loira-banheiro-featured.jpg';

const FeaturedLegend = () => {
  const [hauntedEffect, setHauntedEffect] = useState(false);
  const [showGhost, setShowGhost] = useState(false);
  
  // Random haunting effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setHauntedEffect(true);
        setTimeout(() => setHauntedEffect(false), 300);
      }
      
      // Randomly show/hide ghost
      if (Math.random() > 0.85) {
        setShowGhost(true);
        setTimeout(() => setShowGhost(false), 800);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-16 bg-blood-red/100"></div>
        <h2 className={cn(
          "font-playfair text-3xl px-4 text-center text-aged-white flex items-center",
          hauntedEffect && "animate-text-glitch"
        )}>
          <RitualIcon icon="flame" className="mr-2 text-blood-red" size={20} />
          A Sombra que Sussurra
          <RitualIcon icon="flame" className="ml-2 text-blood-red" size={20} />
        </h2>
        <div className="h-px w-16 bg-blood-red/50"></div>
      </div>
      
      <div className="relative overflow-hidden rounded-lg border border-muted group hover:border-blood-red/30 transition-all duration-500 hover:shadow-[0_0_15px_rgba(202,0,0,0.2)]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Imagem da lenda */}
          <div className="relative h-full">
            <AspectRatio ratio={16 / 9} className="md:h-full bg-muted/20 flex items-center justify-center overflow-hidden">
              {/* Use real image if available, otherwise show default */}
              <img 
                src={legendsData.legends[3]?.image || featuredLegendImage} 
                alt="Loira do Banheiro"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
              
              {/* Blood drip effect */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-0 w-[1px] h-8 bg-blood-red animate-blood-drip opacity-0"
                  style={{ 
                    left: `${20 + i * 30}%`,
                    animationDelay: `${i * 1.5}s`
                  }}
                />
              ))}
              
              {/* Ghost effect */}
              <div 
                className={cn(
                  "absolute w-full h-full pointer-events-none transition-opacity duration-300",
                  showGhost ? "opacity-30" : "opacity-0"
                )}
                aria-hidden="true"
              >
                <div className="absolute top-[40%] left-[60%] animate-ghost-float">
                  <RitualIcon icon="ghost" size={60} className="text-white/60" />
                </div>
              </div>
            </AspectRatio>
          </div>
          
          {/* Conteúdo da lenda */}
          <div className="bg-card p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-blood-red">
              <RitualIcon icon="ghost" animate={true} size={24} />
            </div>
            
            <ScaryText 
              text="Loira do Banheiro" 
              className="font-playfair text-3xl md:text-4xl mb-3 text-blood-red flex items-center"
              delay={300}/>
            
            <p className={cn(
              "font-lora text-base md:text-lg text-aged-white/90 mb-6 leading-relaxed border-l-2 border-blood-red pl-4"
            )}>
              "Helena era uma menina como qualquer outra. Cabelos loiros que brilhavam ao sol, olhos azuis como o céu de verão, sorriso doce que conquistava professores e colegas. Ela tinha apenas doze anos quando tudo mudou, quando uma brincadeira de mau gosto se transformou na lenda urbana mais aterrorizante das escolas brasileiras..."
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center text-aged-white/70 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-blood-red mr-2"></span>
                Origem: Escolas brasileiras
              </div>
              <div className="flex items-center text-aged-white/70 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-blood-red mr-2"></span>
                Popularidade: Muito alta
              </div>
            </div>
            
            <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
              <RitualIcon icon="ghost" size={200} className="text-blood-red animate-mist-flow" />
            </div>
            
            <Link to="/ler-lenda/4" className="mt-6 relative group">
              <RitualButton 
                variant="outline" 
                className="bg-transparent border border-blood-red text-blood-red hover:bg-blood-red/10 group animate-flicker text-md text-center"
                icon={<RitualIcon icon="eye" />}
              >
                Desvendar a lenda
              </RitualButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLegend;
