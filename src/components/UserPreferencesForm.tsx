
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPreferences } from "@/pages/Index";
import { ArrowLeft, Film, ChevronRight, Sparkles, Heart } from "lucide-react";
import SplineScene from "./SplineScene";
import Logo from "./Logo";

interface UserPreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  onBack: () => void;
}

const UserPreferencesForm = ({ onSubmit, onBack }: UserPreferencesFormProps) => {
  const [lastMovie, setLastMovie] = useState("");
  const [preferredGenre, setPreferredGenre] = useState("");
  const [currentMood, setCurrentMood] = useState("");

  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
    "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", 
    "Science Fiction", "Thriller", "War", "Western"
  ];

  const moods = [
    "Excited for adventure", "Want to laugh", "Feel romantic", "Need a good cry",
    "Want to be scared", "Feeling nostalgic", "Need inspiration", "Want to think deeply",
    "Looking for action", "Want something light", "Feeling mysterious", "Need comfort"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lastMovie && preferredGenre && currentMood) {
      onSubmit({ lastMovie, preferredGenre, currentMood });
    }
  };

  const isFormValid = lastMovie && preferredGenre && currentMood;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(139,92,246,0.05)_50%,transparent_70%)] animate-pulse" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-80" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-40" style={{animationDelay: '4s'}}></div>
      </div>

      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-20">
        <SplineScene 
          scene="https://prod.spline.design/qh2NMudMGMr8Av2s/scene.splinecode"
          className="w-full h-full"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          }
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="container mx-auto">
          <Logo size="md" />
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-100px)]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl hover-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                Tell Us About Your
                <span className="block gradient-text">Cinematic Taste</span>
              </h2>
              <p className="text-xl text-gray-300">Help our AI understand your unique preferences</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="glass-effect rounded-2xl p-8 shadow-2xl">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="lastMovie" className="text-gray-200 text-lg font-medium flex items-center gap-3">
                      <Film className="w-5 h-5 text-blue-400" />
                      What's the last movie that captivated you?
                    </Label>
                    <Input
                      id="lastMovie"
                      value={lastMovie}
                      onChange={(e) => setLastMovie(e.target.value)}
                      placeholder="e.g., Dune, The Batman, Parasite, Inception..."
                      className="bg-slate-800/50 border-gray-600 text-gray-100 placeholder-gray-400 text-lg h-14 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="genre" className="text-gray-200 text-lg font-medium flex items-center gap-3">
                      <Heart className="w-5 h-5 text-purple-400" />
                      What genre speaks to your soul?
                    </Label>
                    <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                      <SelectTrigger className="bg-slate-800/50 border-gray-600 text-gray-100 h-14 text-lg rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300">
                        <SelectValue placeholder="Choose your preferred genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-gray-600 rounded-xl">
                        {genres.map((genre) => (
                          <SelectItem 
                            key={genre} 
                            value={genre} 
                            className="text-gray-100 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                          >
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="mood" className="text-gray-200 text-lg font-medium flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-pink-400" />
                      What's your current vibe?
                    </Label>
                    <Select value={currentMood} onValueChange={setCurrentMood}>
                      <SelectTrigger className="bg-slate-800/50 border-gray-600 text-gray-100 h-14 text-lg rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300">
                        <SelectValue placeholder="Tell us how you're feeling" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-gray-600 rounded-xl max-h-60">
                        {moods.map((mood) => (
                          <SelectItem 
                            key={mood} 
                            value={mood} 
                            className="text-gray-100 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                          >
                            {mood}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  type="button"
                  onClick={onBack}
                  variant="outline"
                  className="border-gray-600 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 hover:text-white px-8 py-3 rounded-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={!isFormValid}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-12 py-3 rounded-xl disabled:opacity-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover-glow"
                >
                  Discover My Movies
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesForm;
