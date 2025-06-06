
import { Button } from "@/components/ui/button";
import { Play, Star, Zap } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.8)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-purple-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo and Title */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-8xl md:text-9xl font-light text-white tracking-wider bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Skein
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
              Discover your next obsession with AI-powered recommendations
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 shadow-lg shadow-purple-500/10">
              <Star className="w-6 h-6 text-purple-400 mb-3 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Smart Curation</h3>
              <p className="text-slate-400 text-sm">Advanced AI analyzes your taste</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/80 to-pink-900/60 backdrop-blur-sm rounded-lg p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 shadow-lg shadow-pink-500/10">
              <Zap className="w-6 h-6 text-pink-400 mb-3 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Mood Matching</h3>
              <p className="text-slate-400 text-sm">Find films for how you feel</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/60 backdrop-blur-sm rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 shadow-lg shadow-indigo-500/10">
              <Play className="w-6 h-6 text-indigo-400 mb-3 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Premium Quality</h3>
              <p className="text-slate-400 text-sm">Curated for cinema lovers</p>
            </div>
          </div>
          
          {/* CTA */}
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-12 py-4 text-lg rounded-md transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 border-0"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
