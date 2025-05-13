
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const FeaturedLegend = () => {
  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="relative bg-card rounded-lg p-8 border border-muted overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4 text-blood-red">Loira do Banheiro</h2>
          
          <p className="font-lora text-base md:text-lg max-w-2xl text-aged-white/90 mb-6 leading-relaxed">
            Uma das lendas urbanas mais icônicas do Brasil, a história de uma garota de longos cabelos loiros que assombra os banheiros das escolas. Dizem que ao apagar as luzes e chamar seu nome três vezes em frente ao espelho, ela surge para aterrorizar os incautos.
          </p>
          
          <Link to="/explorar">
            <Button 
              variant="outline" 
              className="bg-transparent border border-blood-red text-blood-red hover:bg-blood-red/10 mt-4 group flex items-center"
            >
              Explorar Lendas
              <Eye className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLegend;
