
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPreferences, MovieRecommendation } from "@/pages/Index";
import { Film, Star, ArrowLeft, Play, Clock, Calendar } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 z-0">
          <SplineScene 
            scene="https://prod.spline.design/llK92eVgf3o6cncH/scene.splinecode"
            className="w-full h-full opacity-30"
            fallback={
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900" />
            }
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl animate-pulse">
            <Film className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Finding Your Perfect Match</h2>
          <p className="text-xl text-slate-400">Analyzing your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900/50 to-purple-900/50" />
        <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
          <SplineScene 
            scene="https://prod.spline.design/2kRemTy4m5E9YtJ5/scene.splinecode"
            className="w-full h-full"
            fallback={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 rounded-full animate-spin-slow opacity-30" />}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Your Recommendations</h2>
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl max-w-4xl mx-auto">
              <p className="text-lg text-slate-300 flex items-center justify-center gap-4 flex-wrap">
                Based on 
                <span className="text-violet-300 font-semibold bg-violet-500/20 px-3 py-1 rounded-lg border border-violet-400/30">
                  {preferences.lastMovie}
                </span>
                your preference for 
                <span className="text-purple-300 font-semibold bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-400/30">
                  {preferences.preferredGenre}
                </span>
                and your 
                <span className="text-indigo-300 font-semibold bg-indigo-500/20 px-3 py-1 rounded-lg border border-indigo-400/30">
                  {preferences.currentMood}
                </span>
                mood
              </p>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {recommendations.map((movie) => (
              <Card 
                key={movie.id} 
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 cursor-pointer group shadow-xl overflow-hidden rounded-xl hover:shadow-2xl transform hover:scale-105"
                onClick={() => onMovieSelect(movie)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-violet-800 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                    <Film className="w-12 h-12 text-violet-300 group-hover:scale-125 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">{movie.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.genre}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                      <span className="text-slate-500">/10</span>
                    </div>
                    
                    <p className="text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed">{movie.description}</p>
                    
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Dir. {movie.director}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Update Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendations;
