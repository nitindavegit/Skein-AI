
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPreferences, MovieRecommendation } from "@/pages/Index";
import { Film, Star, ArrowLeft, Play, Clock, Calendar, CheckCircle } from "lucide-react";
import { generateMovieRecommendations } from "@/utils/movieRecommendations";
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
          console.log("Fetching recommendations for preferences:", preferences);
          const newRecommendations = await generateMovieRecommendations(preferences);
          console.log("Received recommendations:", newRecommendations);
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

  const handleMovieClick = (movie: MovieRecommendation) => {
    console.log("Movie selected:", movie);
    onMovieSelect(movie);
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
    onBack();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Film className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analyzing Your Preferences
          </h2>
          <p className="text-gray-600 mb-8">Our AI is crafting the perfect movie recommendations just for you...</p>
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <Logo size="md" />
        </div>
      </nav>

      {/* Content */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" />
              Recommendations Ready
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Personalized
              <span className="block gradient-text">Movie Collection</span>
            </h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-4xl mx-auto">
              <p className="text-gray-600 flex items-center justify-center gap-4 flex-wrap">
                Based on your love for 
                <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-lg">
                  {preferences.lastMovie}
                </span>
                your preference for 
                <span className="text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-lg">
                  {preferences.preferredGenre}
                </span>
                and your 
                <span className="text-pink-600 font-semibold bg-pink-50 px-3 py-1 rounded-lg">
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
                className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer group rounded-2xl overflow-hidden"
                onClick={() => handleMovieClick(movie)}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {movie.poster ? (
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`${movie.poster ? 'hidden' : 'flex'} w-full h-full items-center justify-center`}>
                      <Film className="w-12 h-12 text-gray-400 group-hover:scale-125 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 bg-white/20 rounded-full p-3 backdrop-blur-sm" />
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{movie.title}</h3>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span className="text-purple-600">{movie.genre}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-600 font-semibold">{movie.rating}</span>
                      <span className="text-gray-400">/10</span>
                      <div className="ml-auto">
                        <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
                            style={{width: `${(movie.rating / 10) * 100}%`}}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{movie.description}</p>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm pt-2 border-t border-gray-100">
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
              onClick={handleBackClick}
              variant="outline"
              className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold"
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
