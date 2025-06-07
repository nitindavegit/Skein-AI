
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Sparkles, Film, Star } from "lucide-react";
import SplineScene from "./SplineScene";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <SplineScene 
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9I/scene.splinecode"
          className="w-full h-full opacity-70"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(139,92,246,0.1)_50%,transparent_70%)]" />
            </div>
          }
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-slate-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Film className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white tracking-wide">Skein</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Discover Your
                  <span className="block text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text">
                    Perfect Film
                  </span>
                </h1>
                
                <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                  AI-powered movie recommendations tailored to your mood, taste, and viewing preferences. 
                  Find your next cinematic obsession.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onStart}
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 rounded-xl backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full border-2 border-slate-900" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">1000+ satisfied users</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-slate-400 text-sm ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Scene Preview */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                  <SplineScene 
                    scene="https://prod.spline.design/llK92eVgf3o6cncH/scene.splinecode"
                    className="w-full h-full"
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mx-auto animate-pulse" />
                          <p className="text-slate-400">Loading 3D Preview...</p>
                        </div>
                      </div>
                    }
                  />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full animate-pulse delay-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 border-t border-slate-800/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Smart AI</h3>
              <p className="text-slate-400">Advanced algorithms analyze your preferences</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Curated Content</h3>
              <p className="text-slate-400">Handpicked movies from every genre</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Personal Touch</h3>
              <p className="text-slate-400">Recommendations that match your mood</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
