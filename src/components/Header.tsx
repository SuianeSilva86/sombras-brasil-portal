
import React from 'react';
import { Link } from 'react-router-dom';
import RitualIcon from '@/components/RitualIcon';
import MysticalTypingEffect from '@/components/MysticalTypingEffect';

const Header = () => {
  return (
    <header className="w-full py-6 flex flex-col items-center animate-fade-in">
      <div className="flex items-center mb-3">
        <RitualIcon icon="moon" className="h-6 w-6 mr-3 text-blood-red animate-pulse-soft" />
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl tracking-wider text-aged-white">
          Sombras do Brasil
        </h1>
        <RitualIcon icon="moon" className="h-6 w-6 ml-3 text-blood-red animate-pulse-soft" />
      </div>
      
      <div className="relative">
        <p className="font-lora italic text-muted-foreground text-sm md:text-base mb-6">
          <MysticalTypingEffect text="Onde o inexplicável encontra um lar" delay={800} />
        </p>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-px bg-blood-red/30"></div>
      </div>
      
      <nav className="flex space-x-6 md:space-x-10 mt-6 border-t border-b border-muted py-3 px-4 w-full max-w-2xl justify-center">
        <Link to="/" className="font-inter text-sm uppercase tracking-wider link-underline text-aged-white flex items-center group">
          <RitualIcon icon="circle" className="h-4 w-4 mr-1.5 transition-transform group-hover:rotate-45" />
          Início
        </Link>
        <Link to="/explorar" className="font-inter text-sm uppercase tracking-wider link-underline text-aged-white flex items-center group">
          <RitualIcon icon="eye" className="h-4 w-4 mr-1.5 transition-transform group-hover:scale-110" />
          Desvendar Ecos
        </Link>
        <Link to="/enviar" className="font-inter text-sm uppercase tracking-wider link-underline text-aged-white flex items-center group">
          <RitualIcon icon="flame" className="h-4 w-4 mr-1.5 transition-transform group-hover:rotate-12" />
          Oferecer sua Memória
        </Link>
      </nav>
    </header>
  );
};

export default Header;
