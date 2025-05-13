
import React from 'react';
import { Link } from 'react-router-dom';
import RitualButton from '@/components/RitualButton';
import RitualIcon from '@/components/RitualIcon';
import { Eye } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const FeaturedLegend = () => {
  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-16 bg-blood-red/50"></div>
        <h2 className="font-playfair text-3xl px-4 text-center text-aged-white flex items-center">
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
            <AspectRatio ratio={16 / 9} className="md:h-full">
              <img 
                src="https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                alt="Loira do Banheiro" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            </AspectRatio>
          </div>
          
          {/* Conteúdo da lenda */}
          <div className="bg-card p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-blood-red">
              <RitualIcon icon="ghost" animate={true} size={24} />
            </div>
            
            <h2 className="font-playfair text-3xl md:text-4xl mb-3 text-blood-red flex items-center">
              <RitualIcon icon="flame" className="mr-2 text-blood-red animate-pulse-soft inline" size={20} />
              Loira do Banheiro
            </h2>
            
            <p className="font-lora text-base md:text-lg text-aged-white/90 mb-6 leading-relaxed border-l-2 border-blood-red pl-4">
              "Uma das lendas urbanas mais icônicas do Brasil, a história de uma garota de longos cabelos loiros que assombra os banheiros das escolas. Dizem que ao apagar as luzes e chamar seu nome três vezes em frente ao espelho, ela surge para aterrorizar os incautos."
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center text-aged-white/70 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-blood-red mr-2"></span>
                Origem: Escolas brasileiras, anos 1970
              </div>
              <div className="flex items-center text-aged-white/70 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-blood-red mr-2"></span>
                Popularidade: Muito alta entre crianças e adolescentes
              </div>
            </div>
            
            <Link to="/ler-lenda/4" className="mt-6">
              <RitualButton 
                variant="outline" 
                className="bg-transparent border border-blood-red text-blood-red hover:bg-blood-red/10 group"
                icon={<RitualIcon icon="eye" />}
              >
                Desvendar Mistério
              </RitualButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLegend;
