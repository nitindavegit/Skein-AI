
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPreferences, MovieRecommendation } from "@/pages/Index";
import { Film, Star, ArrowLeft, Play, Clock, Calendar, Zap } from "lucide-react";
import { generateMovieRecommendations } from "@/utils/movieRecommendations";
import SplineScene from "./SplineScene";
import Logo from "./Logo";

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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <SplineScene 
            scene="https://prod.spline.design/llK92eVgf3o6cncH/scene.splinecode"
            className="w-full h-full opacity-20"
            fallback={<div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />}
          />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse hover-glow">
            <Film className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Crafting Your Perfect
            <span className="block gradient-text">Movie Collection</span>
          </h2>
          <p className="text-xl text-gray-300">Our AI is analyzing your unique taste...</p>
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(139,92,246,0.03)_50%,transparent_70%)]" />
        
        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
          <SplineScene 
            scene="https://prod.spline.design/2kRemTy4m5E9YtJ5/scene.splinecode"
            className="w-full h-full"
            fallback={<div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-float opacity-20" />}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="container mx-auto">
          <Logo size="md" />
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI Analysis Complete
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Your Personalized
              <span className="block gradient-text">Movie Universe</span>
            </h2>
            
            <div className="glass-effect rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 flex items-center justify-center gap-4 flex-wrap">
                Based on your love for 
                <span className="text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                  {preferences.lastMovie}
                </span>
                your preference for 
                <span className="text-purple-400 font-semibold bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">
                  {preferences.preferredGenre}
                </span>
                and your 
                <span className="text-pink-400 font-semibold bg-pink-500/10 px-3 py-1 rounded-lg border border-pink-500/20">
                  {preferences.currentMood}
                </span>
                mood
              </p>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {recommendations.map((movie, index) => (
              <Card 
                key={movie.id} 
                className="glass-effect border-gray-700 hover:border-blue-500/50 transition-all duration-500 cursor-pointer group shadow-xl overflow-hidden rounded-2xl hover:shadow-2xl transform hover:scale-105 hover-glow"
                onClick={() => onMovieSelect(movie)}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                    <Film className="w-12 h-12 text-blue-400 group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 bg-white/20 rounded-full p-3 backdrop-blur-sm" />
                    </div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">{movie.title}</h3>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span className="text-purple-400">{movie.genre}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                      <span className="text-gray-500">/10</span>
                      <div className="ml-auto">
                        <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
                            style={{width: `${(movie.rating / 10) * 100}%`}}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{movie.description}</p>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm pt-2 border-t border-gray-700">
                      <Clock className="w-3 h-3" />
                      <span>Directed by {movie.director}</span>
                    </div>
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
              className="border-gray-600 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 hover:text-white px-8 py-3 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Refine Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendations;
