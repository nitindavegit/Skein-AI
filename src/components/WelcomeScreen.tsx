
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Star, Users, Award, Zap } from "lucide-react";
import Logo from "./Logo";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background with particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(139,92,246,0.05)_50%,transparent_70%)] animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-80" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-40" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-blue-300 rounded-full animate-float opacity-70" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-6">
            <button className="text-gray-300 hover:text-white transition-colors font-medium">About</button>
            <button className="text-gray-300 hover:text-white transition-colors font-medium">Features</button>
            <button className="text-gray-300 hover:text-white transition-colors font-medium">Contact</button>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered Full Width */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-100px)]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Powered by Advanced AI
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight">
                  Discover
                  <span className="block gradient-text">Cinematic</span>
                  <span className="block text-gray-100">Perfection</span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Experience personalized movie recommendations powered by cutting-edge AI. 
                  Find films that resonate with your unique taste and mood.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onStart}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover-glow"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Your Journey
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-gray-600 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 hover:text-white px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 pt-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-slate-800" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">10K+ users</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-400 text-sm ml-2">4.9 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Why Choose Skein?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience the future of movie discovery with our advanced AI technology</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-8 glass-effect rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Smart AI Engine</h3>
              <p className="text-gray-400">Advanced machine learning algorithms analyze your preferences with precision</p>
            </div>
            
            <div className="text-center space-y-4 p-8 glass-effect rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Curated Excellence</h3>
              <p className="text-gray-400">Handpicked movies from every genre, era, and style imaginable</p>
            </div>
            
            <div className="text-center space-y-4 p-8 glass-effect rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Personal Touch</h3>
              <p className="text-gray-400">Recommendations that evolve with your taste and current mood</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
