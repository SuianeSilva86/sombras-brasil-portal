
import React from 'react';
import Header from '@/components/Header';
import FeaturedLegend from '@/components/FeaturedLegend';
import ExploreSection from '@/components/ExploreSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center">
          <FeaturedLegend />
          <ExploreSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
