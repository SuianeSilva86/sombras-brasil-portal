
import React from 'react';
import { 
  Moon, 
  Eye, 
  Star, 
  Circle, 
  Flame, 
  Shield, 
  Ghost, 
  Key, 
  BookOpen,
  Skull,
  Bookmark,
  User,
  Clock
} from 'lucide-react';

type IconType = 
  | 'moon' 
  | 'eye' 
  | 'star' 
  | 'circle' 
  | 'flame' 
  | 'shield' 
  | 'ghost'
  | 'key'
  | 'book'
  | 'skull'
  | 'bookmark'
  | 'user'
  | 'clock'
  | 'seal'
  | 'candle';

interface RitualIconProps {
  icon: IconType;
  size?: number;
  className?: string;
  animate?: boolean;
}

const RitualIcon: React.FC<RitualIconProps> = ({ 
  icon, 
  size = 16, 
  className = "",
  animate = false
}) => {
  const animationClass = animate ? 'animate-pulse-soft' : '';
  const classes = `${className} ${animationClass}`;
  
  switch (icon) {
    case 'moon':
      return <Moon size={size} className={classes} />;
    case 'eye':
      return <Eye size={size} className={classes} />;
    case 'star':
      return <Star size={size} className={classes} />;
    case 'circle':
      return <Circle size={size} className={classes} />;
    case 'flame':
      return <Flame size={size} className={classes} />;
    case 'shield':
      return <Shield size={size} className={classes} />;
    case 'ghost':
      return <Ghost size={size} className={classes} />;
    case 'key':
      return <Key size={size} className={classes} />;
    case 'book':
      return <BookOpen size={size} className={classes} />;
    case 'skull':
      return <Skull size={size} className={classes} />;
    case 'bookmark':
      return <Bookmark size={size} className={classes} />;
    case 'user':
      return <User size={size} className={classes} />;
    case 'clock':
      return <Clock size={size} className={classes} />;
    // Ícones adicionais usados como substitutos
    case 'seal':
      return <Bookmark size={size} className={classes} />;
    case 'candle':
      return <Flame size={size} className={classes} />;
    default:
      return <Circle size={size} className={classes} />;
  }
};

export { RitualIcon };
export default RitualIcon;
