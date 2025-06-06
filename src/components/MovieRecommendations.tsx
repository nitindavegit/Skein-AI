
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPreferences, MovieRecommendation } from "@/pages/Index";
import { Film, Star, ArrowLeft, Play } from "lucide-react";
import { generateMovieRecommendations } from "@/utils/movieRecommendations";

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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
            <Film className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-light text-white mb-3">Finding Your Perfect Match</h2>
          <p className="text-lg text-slate-300 font-light">Analyzing your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">Your Recommendations</h2>
            <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Based on <span className="text-purple-300 font-medium">{preferences.lastMovie}</span>, 
              your preference for <span className="text-purple-300 font-medium">{preferences.preferredGenre}</span>, 
              and your <span className="text-purple-300 font-medium">{preferences.currentMood}</span> mood
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
            {recommendations.map((movie) => (
              <Card 
                key={movie.id} 
                className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group shadow-lg shadow-purple-500/10 overflow-hidden rounded-lg hover:shadow-purple-500/20"
                onClick={() => onMovieSelect(movie)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-purple-800 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <Film className="w-8 h-8 text-purple-300 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-medium text-sm mb-2 line-clamp-2">{movie.title}</h3>
                    <p className="text-slate-400 text-xs mb-2">{movie.year} • {movie.genre}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-medium text-xs">{movie.rating}</span>
                      <span className="text-slate-500 text-xs">/10</span>
                    </div>
                    
                    <p className="text-slate-400 text-xs line-clamp-2 mb-2 leading-relaxed">{movie.description}</p>
                    
                    <p className="text-slate-500 text-xs">Dir. {movie.director}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={onBack}
              className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white border-0 px-8 py-3 text-base flex items-center gap-2 mx-auto rounded-md shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Update Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendations;
