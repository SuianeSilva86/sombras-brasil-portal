
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScaryTextProps {
  text: string;
  className?: string;
  delay?: number;
  glitchInterval?: number;
  children?: React.ReactNode;
}

const ScaryText: React.FC<ScaryTextProps> = ({
  text,
  className,
  delay = 0,
  glitchInterval = 5000,
  children,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Start typing effect after delay
    timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 70);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  // Random glitch effect
  useEffect(() => {
    const glitchTimeout = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, glitchInterval);
    
    return () => clearInterval(glitchTimeout);
  }, [glitchInterval]);
  
  return (
    <div className={cn(
      "relative",
      isGlitching && "animate-[textShadow_1.6s_infinite]",
      className
    )}>
      <span className={cn(
        "relative inline-block",
        isGlitching && "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-[1px] after:bg-blood-red after:animate-pulse"
      )}>
        {displayText}
        {children}
        {displayText.length < text.length && (
          <span className="animate-pulse ml-0.5">|</span>
        )}
      </span>
    </div>
  );
};

export default ScaryText;
