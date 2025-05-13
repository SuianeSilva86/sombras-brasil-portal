
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Explorar = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="font-playfair text-3xl md:text-4xl text-aged-white mb-6">
            Explore Todas as Lendas
          </h1>
          <p className="font-lora text-muted-foreground max-w-2xl text-center">
            Esta página está em construção. Em breve, você poderá explorar nossa coleção completa de lendas brasileiras.
          </p>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Explorar;
