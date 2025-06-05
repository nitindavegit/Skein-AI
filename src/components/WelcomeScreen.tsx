
import { Button } from "@/components/ui/button";
import { Play, Star, Zap } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo and Title */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-8xl md:text-9xl font-light text-white tracking-wider">
                Skein
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              Discover your next obsession with AI-powered recommendations
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <Star className="w-6 h-6 text-red-600 mb-3 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Smart Curation</h3>
              <p className="text-gray-400 text-sm">Advanced AI analyzes your taste</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <Zap className="w-6 h-6 text-red-600 mb-3 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Mood Matching</h3>
              <p className="text-gray-400 text-sm">Find films for how you feel</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <Play className="w-6 h-6 text-red-600 mb-3 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400 text-sm">Curated for cinema lovers</p>
            </div>
          </div>
          
          {/* CTA */}
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-12 py-4 text-lg rounded-md transition-colors duration-300 shadow-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
