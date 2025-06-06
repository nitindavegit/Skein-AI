
import { Button } from "@/components/ui/button";
import { Play, Star, Zap, Sparkles, Heart, Film, Rocket } from "lucide-react";
import SplineScene from "./SplineScene";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <SplineScene 
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9I/scene.splinecode"
          className="w-full h-full opacity-60"
          fallback={
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.85)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
              }}
            />
          }
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/50 to-pink-900/40" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/4 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-30 animation-delay-3000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo and Title */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-2xl shadow-purple-500/40 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Film className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 via-pink-200 to-cyan-200 bg-clip-text tracking-wider drop-shadow-2xl">
                Skein
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-slate-200 font-light leading-relaxed max-w-4xl mx-auto flex items-center justify-center gap-4 flex-wrap">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              Discover your next obsession with AI-powered recommendations
              <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
            </p>
          </div>
          
          {/* Enhanced Features with 3D Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2 relative z-10">
                ✨ Smart Curation
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed relative z-10">Advanced AI analyzes your taste patterns</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/90 to-pink-900/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-pink-500/30 hover:border-pink-400/50 transition-all duration-500 shadow-2xl shadow-pink-500/20 hover:shadow-pink-500/40 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2 relative z-10">
                🎭 Mood Matching
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed relative z-10">Find films that match how you feel</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/90 to-cyan-900/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2 relative z-10">
                🏆 Premium Quality
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed relative z-10">Curated exclusively for cinema lovers</p>
            </div>
          </div>
          
          {/* Enhanced CTA */}
          <div className="flex flex-col items-center gap-6">
            <Button 
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white font-bold px-16 py-6 text-xl rounded-2xl transition-all duration-500 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 border-0 transform hover:scale-110 hover:-translate-y-1 flex items-center gap-4 relative z-10"
            >
              <Rocket className="w-6 h-6" />
              Get Started
              <Sparkles className="w-6 h-6 animate-pulse" />
            </Button>
            <p className="text-slate-400 text-lg flex items-center gap-2 relative z-10">
              <span>🎬</span>
              Join thousands of movie lovers
              <span>🍿</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
