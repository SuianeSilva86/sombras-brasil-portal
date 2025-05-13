
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import RitualIcon from './RitualIcon';
import { cn } from '@/lib/utils';

interface RitualButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const RitualButton: React.FC<RitualButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  icon,
  iconPosition = 'left',
  loading = false,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const borderClass = isHovering 
    ? "before:absolute before:inset-0 before:rounded-md before:border before:border-blood-red/50 before:animate-pulse" 
    : "";
  
  const loadingIcon = loading ? (
    <div className="animate-spin">
      <RitualIcon icon="seal" size={16} />
    </div>
  ) : null;

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden transition-all group", 
        borderClass, 
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? loadingIcon : iconPosition === 'left' && icon && (
        <span className="mr-2 transition-transform group-hover:scale-110">{icon}</span>
      )}
      <span className={cn(
        "transition-all",
        isHovering ? "text-blood-red" : ""
      )}>
        {children}
      </span>
      {!loading && iconPosition === 'right' && icon && (
        <span className="ml-2 transition-transform group-hover:scale-110">{icon}</span>
      )}
    </Button>
  );
};

export default RitualButton;
