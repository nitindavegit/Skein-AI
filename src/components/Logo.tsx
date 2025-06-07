
import { Film, Sparkles } from "lucide-react";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
}

const Logo = ({ size = 'md', showIcon = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex items-center gap-3">
      {showIcon && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-sm opacity-60"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-2 shadow-xl">
            <Film className={`${iconSizes[size]} text-white`} />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
          </div>
        </div>
      )}
      <span className={`${sizeClasses[size]} font-serif font-bold gradient-text tracking-wide`}>
        Skein
      </span>
    </div>
  );
};

export default Logo;
