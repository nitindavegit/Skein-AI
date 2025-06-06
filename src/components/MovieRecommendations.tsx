
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6">
            <Film className="w-8 h-8 text-gray-800 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Finding Your Perfect Match</h2>
          <p className="text-lg text-gray-400 font-normal">Analyzing your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">Your Recommendations</h2>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed font-normal">
              Based on <span className="text-white font-medium">{preferences.lastMovie}</span>, 
              your preference for <span className="text-white font-medium">{preferences.preferredGenre}</span>, 
              and your <span className="text-white font-medium">{preferences.currentMood}</span> mood
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
            {recommendations.map((movie) => (
              <Card 
                key={movie.id} 
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer group shadow-lg overflow-hidden rounded"
                onClick={() => onMovieSelect(movie)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gray-800 rounded-t flex items-center justify-center relative overflow-hidden">
                    <Film className="w-8 h-8 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-medium text-sm mb-2 line-clamp-2">{movie.title}</h3>
                    <p className="text-gray-500 text-xs mb-2">{movie.year} • {movie.genre}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-yellow-500 font-medium text-xs">{movie.rating}</span>
                      <span className="text-gray-600 text-xs">/10</span>
                    </div>
                    
                    <p className="text-gray-400 text-xs line-clamp-2 mb-2 leading-relaxed">{movie.description}</p>
                    
                    <p className="text-gray-600 text-xs">Dir. {movie.director}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={onBack}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-8 py-3 text-base flex items-center gap-2 mx-auto rounded"
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
