
import React, { useEffect, useState } from 'react';

interface HauntedCursorProps {
  reducedMotion?: boolean;
}

const HauntedCursor: React.FC<HauntedCursorProps> = ({ reducedMotion = false }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Verificamos se o usuário prefere redução de movimento através do sistema operacional
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldShowEffects = !reducedMotion && !prefersReducedMotion && !document.documentElement.classList.contains('reduce-motion');
    
    if (!shouldShowEffects) {
      return;
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);
  
  // Não renderizar nada se os efeitos estiverem reduzidos ou o cursor não estiver visível
  if (!isVisible || reducedMotion || document.documentElement.classList.contains('reduce-motion')) return null;
  
  return (
    <>
      <div 
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
        aria-hidden="true"
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-full border-2 border-blood-red animate-pulse-soft opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-blood-red rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      <div 
        className="fixed pointer-events-none z-40 opacity-20 blur-sm"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%) scale(2)',
          transition: 'transform 1s ease-out'
        }}
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full bg-blood-red/30 animate-pulse-soft"></div>
      </div>
    </>
  );
};

export default HauntedCursor;
