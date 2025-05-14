
import { useEffect, useState } from 'react';

interface HauntedCursorProps {
  reducedMotion?: boolean;
}

const HauntedCursor = ({ reducedMotion = false }: HauntedCursorProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (reducedMotion) {
      // If reduced motion is enabled, don't use custom cursor
      document.body.classList.remove("cursor-none");
      return;
    }
    
    // Add cursor-none class to hide default cursor
    document.body.classList.add("cursor-none");
    
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.position = 'fixed';
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.borderRadius = '12px';
    cursor.style.border = '2px solid rgba(202, 0, 0, 0.8)'; // Increased opacity for better visibility
    cursor.style.backgroundColor = 'rgba(202, 0, 0, 0.2)'; // Increased opacity for better visibility
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.mixBlendMode = 'normal'; // Changed from difference to normal for better visibility
    cursor.style.backdropFilter = 'invert(0.2)';
    cursor.style.transition = 'width 0.3s, height 0.3s, opacity 0.3s';
    
    const innerCursor = document.createElement('div');
    innerCursor.classList.add('inner-cursor');
    innerCursor.style.position = 'absolute';
    innerCursor.style.width = '8px'; // Increased from 6px for better visibility
    innerCursor.style.height = '8px'; // Increased from 6px for better visibility
    innerCursor.style.borderRadius = '50%';
    innerCursor.style.backgroundColor = 'rgba(202, 0, 0, 1)'; // Full opacity for better visibility
    innerCursor.style.left = '50%';
    innerCursor.style.top = '50%';
    innerCursor.style.transform = 'translate(-50%, -50%)';
    
    cursor.appendChild(innerCursor);
    document.body.appendChild(cursor);
    
    const trailEffects: HTMLDivElement[] = [];
    let maxTrailCount = 5;
    
    for (let i = 0; i < maxTrailCount; i++) {
      const trail = document.createElement('div');
      trail.classList.add('cursor-trail');
      trail.style.position = 'fixed';
      trail.style.width = '8px';
      trail.style.height = '8px';
      trail.style.borderRadius = '50%';
      trail.style.backgroundColor = 'rgba(202, 0, 0, 0.4)'; // Increased opacity for better visibility
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '9998';
      trail.style.opacity = `${(maxTrailCount - i) / maxTrailCount * 0.5}`; // Increased opacity for better visibility
      trail.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(trail);
      trailEffects.push(trail);
    }
    
    let cursorX = -100;
    let cursorY = -100;
    let trailPositions: { x: number, y: number }[] = trailEffects.map(() => ({ x: -100, y: -100 }));
    
    // Check if cursor is visible on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      // Make sure cursor is visible
      if (!isVisible) {
        setIsVisible(true);
        cursor.style.display = 'block';
      }
      
      // Ocasionalmente distorce o cursor para efeito assustador
      if (Math.random() > 0.995) {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.opacity = '0.8';
        
        setTimeout(() => {
          cursor.style.width = '24px';
          cursor.style.height = '24px';
          cursor.style.opacity = '1';
        }, 150);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Atualiza as posições de rastro
    const updateTrailPositions = () => {
      for (let i = trailPositions.length - 1; i > 0; i--) {
        trailPositions[i] = { ...trailPositions[i - 1] };
      }
      trailPositions[0] = { x: cursorX, y: cursorY };
      
      trailEffects.forEach((trail, i) => {
        const pos = trailPositions[i];
        trail.style.left = `${pos.x}px`;
        trail.style.top = `${pos.y}px`;
      });
      
      requestAnimationFrame(updateTrailPositions);
    };
    
    updateTrailPositions();
    
    // Trata interação com elementos clicáveis
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    const handleHover = () => {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
    };
    
    const handleMouseOut = () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
    };
    
    // Handle mouse leaving the window
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
      setIsVisible(false);
    });
    
    // Handle mouse entering the window
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'block';
      setIsVisible(true);
    });
    
    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleHover);
      link.addEventListener('mouseleave', handleMouseOut);
    });
    
    return () => {
      // Clean up
      cursor.remove();
      trailEffects.forEach(trail => trail.remove());
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleHover);
        link.removeEventListener('mouseleave', handleMouseOut);
      });
      document.body.classList.remove("cursor-none");
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', () => {
        cursor.style.display = 'none';
      });
      document.removeEventListener('mouseenter', () => {
        cursor.style.display = 'block';
      });
    };
  }, [reducedMotion, isVisible]);
  
  // Não renderiza nada no DOM, apenas adiciona o cursor via JS
  return null;
};

export default HauntedCursor;
