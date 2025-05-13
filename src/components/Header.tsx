
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 flex flex-col items-center animate-fade-in">
      <div className="flex items-center mb-3">
        <Moon className="h-5 w-5 mr-2 text-blood-red animate-pulse-soft" />
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl tracking-wider text-aged-white">
          Sombras do Brasil
        </h1>
        <Moon className="h-5 w-5 ml-2 text-blood-red animate-pulse-soft" />
      </div>
      
      <p className="font-lora italic text-muted-foreground text-sm md:text-base mb-6">
        Onde o inexplicável encontra um lar
      </p>
      
      <nav className="flex space-x-6 md:space-x-10 mt-4 border-t border-b border-muted py-3 px-4 w-full max-w-2xl justify-center">
        <Link to="/" className="font-inter text-sm uppercase tracking-wider link-underline text-aged-white">
          Início
        </Link>
        <Link to="/explorar" className="font-inter text-sm uppercase tracking-wider link-underline text-aged-white">
          Explorar
        </Link>
        <Link to="/enviar" className="font-inter text-sm uppercase tracking-wider link-underline text-aged-white">
          Enviar Lenda
        </Link>
      </nav>
    </header>
  );
};

export default Header;
