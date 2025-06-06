
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPreferences, MovieRecommendation } from "@/pages/Index";
import { Film, Star, ArrowLeft, Play, Sparkles, Zap } from "lucide-react";
import { generateMovieRecommendations } from "@/utils/movieRecommendations";
import SplineScene from "./SplineScene";

interface MovieRecommendationsProps {
  preferences: UserPreferences;
  onMovieSelect: (movie: MovieRecommendation) => void;
  onBack: () => void;
  recommendations: MovieRecommendation[];
  setRecommendations: (recommendations: MovieRecommendation[]) => void;
}

const MovieRecommendations = ({ 
  preferences, 
  onMovieSelect, 
  onBack, 
  recommendations, 
  setRecommendations 
}: MovieRecommendationsProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (recommendations.length === 0) {
        setLoading(true);
        try {
          const newRecommendations = await generateMovieRecommendations(preferences);
          setRecommendations(newRecommendations);
        } catch (error) {
          console.error("Error generating recommendations:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecommendations();
  }, [preferences, recommendations.length, setRecommendations]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        {/* 3D Loading Scene */}
        <div className="absolute inset-0 z-0">
          <SplineScene 
            scene="https://prod.spline.design/llK92eVgf3o6cncH/scene.splinecode"
            className="w-full h-full opacity-40"
            fallback={
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.95)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
                }}
              />
            }
          />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/40 animate-pulse">
            <Film className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            Finding Your Perfect Match
            <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
          </h2>
          <p className="text-xl text-slate-300 font-light">🎬 Analyzing your preferences... 🍿</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Background with floating 3D elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.95)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/40 to-pink-900/30" />
        
        {/* Floating 3D Movie Reel */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-30 pointer-events-none">
          <SplineScene 
            scene="https://prod.spline.design/2kRemTy4m5E9YtJ5/scene.splinecode"
            className="w-full h-full"
            fallback={
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-50"></div>
            }
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 via-pink-200 to-cyan-200 bg-clip-text mb-6 tracking-wide">
              ✨ Your Recommendations 🎬
            </h2>
            <div className="bg-gradient-to-r from-slate-800/80 to-purple-900/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-xl max-w-5xl mx-auto">
              <p className="text-xl text-slate-200 leading-relaxed font-light flex items-center justify-center gap-2 flex-wrap">
                Based on 
                <span className="text-purple-300 font-semibold bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-400/30">
                  🎭 {preferences.lastMovie}
                </span>
                your preference for 
                <span className="text-pink-300 font-semibold bg-pink-500/20 px-3 py-1 rounded-lg border border-pink-400/30">
                  🎪 {preferences.preferredGenre}
                </span>
                and your 
                <span className="text-cyan-300 font-semibold bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-400/30">
                  🎨 {preferences.currentMood}
                </span>
                mood
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
            {recommendations.map((movie) => (
              <Card 
                key={movie.id} 
                className="bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 cursor-pointer group shadow-2xl shadow-purple-500/20 overflow-hidden rounded-2xl hover:shadow-purple-500/40 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => onMovieSelect(movie)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-purple-800 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                    <Film className="w-10 h-10 text-purple-300 group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-bold text-base mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors duration-300">{movie.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                      <span>🗓️</span> {movie.year} • <span>🎭</span> {movie.genre}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-bold text-sm">{movie.rating}</span>
                      <span className="text-slate-500 text-sm">/10</span>
                    </div>
                    
                    <p className="text-slate-300 text-sm line-clamp-2 mb-3 leading-relaxed">{movie.description}</p>
                    
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                      <span>🎬</span> Dir. {movie.director}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={onBack}
              className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 hover:from-slate-600 hover:via-slate-500 hover:to-slate-400 text-white border-0 px-10 py-4 text-lg flex items-center gap-3 mx-auto rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              🔄 Update Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendations;
