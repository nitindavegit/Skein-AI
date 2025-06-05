
import { Button } from "@/components/ui/button";
import { Play, Star, Zap } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=5760&h=3840')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo and Title */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-purple-600 to-gold-500 rounded-lg flex items-center justify-center mr-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight">
                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-amber-400 bg-clip-text text-transparent">
                  Skein
                </span>
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              Discover cinematic masterpieces tailored to your taste with AI-powered precision
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-red-500/30 transition-all duration-300">
              <Star className="w-8 h-8 text-amber-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-3">Curated Intelligence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Advanced algorithms analyze your preferences for perfect cinematic matches</p>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <Zap className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-3">Mood-Based Discovery</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Find films that resonate with your current emotional state</p>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
              <Play className="w-8 h-8 text-red-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-3">Premium Experience</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Immersive interface designed for true cinema enthusiasts</p>
            </div>
          </div>
          
          {/* CTA */}
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold px-16 py-6 text-xl rounded-full transition-all duration-500 transform hover:scale-105 shadow-2xl border-0 hover:shadow-red-500/25"
          >
            Begin Your Journey
          </Button>
          
          {/* Bottom tagline */}
          <p className="mt-12 text-gray-500 text-sm font-light tracking-wide">
            Where artificial intelligence meets cinematic artistry
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
