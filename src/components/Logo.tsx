
import { Film } from "lucide-react";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
}

const Logo = ({ size = 'md', showIcon = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <div className="p-1.5 bg-primary rounded-lg">
          <Film className={`${iconSizes[size]} text-primary-foreground`} />
        </div>
      )}
      <span className={`${sizeClasses[size]} font-semibold text-foreground tracking-tight`}>
        Skein
      </span>
    </div>
  );
};

export default Logo;
