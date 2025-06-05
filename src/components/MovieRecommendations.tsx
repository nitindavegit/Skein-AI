
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=6000&h=4000')`
          }}
        />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Film className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Curating Your Experience</h2>
          <p className="text-xl text-gray-300 font-light">Our AI is analyzing your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=6000&h=4000')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Your Curated Selection</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Based on <span className="text-red-400 font-medium">{preferences.lastMovie}</span>, 
              your preference for <span className="text-purple-400 font-medium">{preferences.preferredGenre}</span>, 
              and your <span className="text-amber-400 font-medium">{preferences.currentMood}</span> mood
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-16">
            {recommendations.map((movie) => (
              <Card 
                key={movie.id} 
                className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-500 transform hover:scale-105 cursor-pointer group shadow-2xl overflow-hidden rounded-2xl"
                onClick={() => onMovieSelect(movie)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                    <Film className="w-12 h-12 text-gray-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 tracking-tight">{movie.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 font-light">{movie.year} • {movie.genre}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-amber-400 font-semibold">{movie.rating}</span>
                      <span className="text-gray-500">/10</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">{movie.description}</p>
                    
                    <p className="text-gray-500 text-xs font-light">Directed by {movie.director}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={onBack}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-12 py-4 text-lg flex items-center gap-3 mx-auto rounded-xl transition-all duration-300 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5" />
              Update Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendations;
