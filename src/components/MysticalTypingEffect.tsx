
import React, { useState, useEffect } from 'react';

interface MysticalTypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

const MysticalTypingEffect: React.FC<MysticalTypingEffectProps> = ({
  text,
  speed = 50,
  className = "",
  delay = 1000
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text.charAt(index));
        setIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, started]);

  return (
    <span className={className}>
      {displayText}
      {index < text.length && <span className="opacity-70 animate-pulse">|</span>}
    </span>
  );
};

export default MysticalTypingEffect;
