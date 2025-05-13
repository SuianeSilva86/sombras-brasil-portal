
import React from 'react';
import { Eye, Key, Hand, Moon, Star, Circle, Flame, Ghost } from 'lucide-react';

type IconType = 'eye' | 'key' | 'hand' | 'moon' | 'star' | 'circle' | 'flame' | 'ghost' | 'seal' | 'candle';

interface RitualIconProps {
  icon: IconType;
  size?: number;
  className?: string;
  animate?: boolean;
}

const RitualIcon: React.FC<RitualIconProps> = ({ 
  icon, 
  size = 24, 
  className = "",
  animate = false
}) => {
  const animationClass = animate ? "animate-pulse-soft" : "";
  const combinedClass = `${className} ${animationClass}`;
  
  // Custom styling for woodcut appearance
  const iconStyle = {
    strokeWidth: 1.5,
    strokeLinejoin: 'bevel' as const,
    filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.3))'
  };
  
  switch (icon) {
    case 'eye':
      return <Eye size={size} className={combinedClass} style={iconStyle} />;
    case 'key':
      return <Key size={size} className={combinedClass} style={iconStyle} />;
    case 'hand':
      return <Hand size={size} className={combinedClass} style={iconStyle} />;
    case 'moon':
      return <Moon size={size} className={combinedClass} style={iconStyle} />;
    case 'star':
      return <Star size={size} className={combinedClass} style={iconStyle} />;
    case 'circle':
      return <Circle size={size} className={combinedClass} style={iconStyle} />;
    case 'flame':
      return <Flame size={size} className={combinedClass} style={iconStyle} />;
    case 'ghost':
      return <Ghost size={size} className={combinedClass} style={iconStyle} />;
    case 'candle':
      return <Flame size={size} className={combinedClass} style={iconStyle} />; // Using Flame as a substitute for Candle
    case 'seal':
      return (
        <div className={`relative ${combinedClass}`}>
          <Circle size={size} style={iconStyle} />
          <Star 
            size={size * 0.7} 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
            style={iconStyle}
          />
        </div>
      );
    default:
      return <Circle size={size} className={combinedClass} style={iconStyle} />;
  }
};

export default RitualIcon;
