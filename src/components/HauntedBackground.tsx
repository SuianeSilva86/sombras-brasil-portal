
import React, { useEffect, useRef } from 'react';

interface HauntedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  reducedMotion?: boolean;
}

const HauntedBackground: React.FC<HauntedBackgroundProps> = ({
  intensity = 'medium',
  reducedMotion = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Verificamos se o usuário prefere redução de movimento através do sistema operacional
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = !reducedMotion && !prefersReducedMotion && !document.documentElement.classList.contains('reduce-motion');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create haunting mist particles
    const getParticleCount = () => {
      switch (intensity) {
        case 'low': return 20;
        case 'high': return 80;
        case 'medium':
        default: return 50;
      }
    };
    
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: {
        x: number;
        y: number;
      };
      alpha: number;
    }[] = [];
    
    const createParticles = () => {
      const particleCount = getParticleCount();
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: `rgba(${Math.floor(Math.random() * 30)}, 0, 0, 0.${Math.floor(Math.random() * 3 + 1)})`,
          velocity: {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.1
          },
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    createParticles();
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      if (shouldAnimate) {
        animationFrameId = requestAnimationFrame(animate);
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        
        // Update position only if animation is enabled
        if (shouldAnimate) {
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          
          // Wrap around screen
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }
      });
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, reducedMotion]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      style={{ 
        mixBlendMode: 'multiply',
        filter: 'blur(2px)' 
      }}
      aria-hidden="true"
    />
  );
};

export default HauntedBackground;
