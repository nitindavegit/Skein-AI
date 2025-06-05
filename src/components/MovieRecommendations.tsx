
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPreferences, MovieRecommendation } from "@/pages/Index";
import { Film, Star } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 mx-auto text-yellow-400 mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Preferences</h2>
          <p className="text-gray-300">Our AI is finding the perfect movies for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Your Personalized Recommendations</h2>
          <p className="text-gray-300 text-lg">
            Based on <span className="text-yellow-400">{preferences.lastMovie}</span>, 
            your love for <span className="text-red-400">{preferences.preferredGenre}</span>, 
            and your <span className="text-purple-400">{preferences.currentMood}</span> mood
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {recommendations.map((movie) => (
            <Card 
              key={movie.id} 
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => onMovieSelect(movie)}
            >
              <CardContent className="p-6">
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-400" />
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{movie.year} • {movie.genre}</p>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                
                <p className="text-gray-300 text-sm line-clamp-3 mb-3">{movie.description}</p>
                
                <p className="text-gray-400 text-xs">Directed by {movie.director}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onBack}
            variant="outline"
            className="px-8 py-3 text-lg border-white/30 text-white hover:bg-white/20"
          >
            Update Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendations;
