
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPreferences } from "@/pages/Index";
import { ArrowLeft, Film, Sparkles, Heart, Zap, Smile, Frown, Star, ThumbsUp, Coffee, Sun, Moon, Music } from "lucide-react";

interface UserPreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  onBack: () => void;
}

const UserPreferencesForm = ({ onSubmit, onBack }: UserPreferencesFormProps) => {
  const [lastMovie, setLastMovie] = useState("");
  const [preferredGenre, setPreferredGenre] = useState("");
  const [currentMood, setCurrentMood] = useState("");

  const genres = [
    { value: "Action", emoji: "💥", color: "text-orange-400" },
    { value: "Adventure", emoji: "🗺️", color: "text-green-400" },
    { value: "Animation", emoji: "🎨", color: "text-purple-400" },
    { value: "Comedy", emoji: "😄", color: "text-yellow-400" },
    { value: "Crime", emoji: "🕵️", color: "text-red-400" },
    { value: "Documentary", emoji: "📚", color: "text-blue-400" },
    { value: "Drama", emoji: "🎭", color: "text-pink-400" },
    { value: "Family", emoji: "👨‍👩‍👧‍👦", color: "text-green-400" },
    { value: "Fantasy", emoji: "🧙‍♂️", color: "text-purple-400" },
    { value: "Horror", emoji: "👻", color: "text-red-400" },
    { value: "Mystery", emoji: "🔍", color: "text-indigo-400" },
    { value: "Romance", emoji: "💕", color: "text-pink-400" },
    { value: "Science Fiction", emoji: "🚀", color: "text-cyan-400" },
    { value: "Thriller", emoji: "⚡", color: "text-yellow-400" },
    { value: "War", emoji: "⚔️", color: "text-gray-400" },
    { value: "Western", emoji: "🤠", color: "text-orange-400" }
  ];

  const moods = [
    { value: "Excited for adventure", emoji: "🤩", color: "text-orange-400", bg: "bg-orange-500/20" },
    { value: "Want to laugh", emoji: "😂", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    { value: "Feel romantic", emoji: "💕", color: "text-pink-400", bg: "bg-pink-500/20" },
    { value: "Need a good cry", emoji: "😢", color: "text-blue-400", bg: "bg-blue-500/20" },
    { value: "Want to be scared", emoji: "😱", color: "text-red-400", bg: "bg-red-500/20" },
    { value: "Feeling nostalgic", emoji: "🌅", color: "text-purple-400", bg: "bg-purple-500/20" },
    { value: "Need inspiration", emoji: "✨", color: "text-cyan-400", bg: "bg-cyan-500/20" },
    { value: "Want to think deeply", emoji: "🤔", color: "text-indigo-400", bg: "bg-indigo-500/20" },
    { value: "Looking for action", emoji: "🔥", color: "text-orange-400", bg: "bg-orange-500/20" },
    { value: "Want something light", emoji: "☀️", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    { value: "Feeling mysterious", emoji: "🌙", color: "text-slate-400", bg: "bg-slate-500/20" },
    { value: "Need comfort", emoji: "🤗", color: "text-green-400", bg: "bg-green-500/20" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lastMovie && preferredGenre && currentMood) {
      onSubmit({ lastMovie, preferredGenre, currentMood });
    }
  };

  const isFormValid = lastMovie && preferredGenre && currentMood;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Enhanced Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.95)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/40 to-pink-900/30" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text mb-4 tracking-wide">
              Tell Us About You
            </h2>
            <p className="text-xl text-slate-300 font-light flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Help us find your perfect match
              <Zap className="w-5 h-5 text-yellow-400" />
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-br from-slate-800/95 to-indigo-900/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300">
              <div className="space-y-8">
                <div>
                  <Label htmlFor="lastMovie" className="text-white text-lg font-semibold mb-4 block flex items-center gap-3">
                    <Film className="w-6 h-6 text-purple-400" />
                    What's the last movie you watched?
                  </Label>
                  <Input
                    id="lastMovie"
                    value={lastMovie}
                    onChange={(e) => setLastMovie(e.target.value)}
                    placeholder="e.g., Dune, The Batman, Parasite..."
                    className="bg-slate-900/80 border-2 border-purple-500/40 text-white placeholder-slate-400 text-lg p-6 h-14 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 shadow-inner"
                  />
                </div>

                <div>
                  <Label htmlFor="genre" className="text-white text-lg font-semibold mb-4 block flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-400" />
                    What genre are you in the mood for?
                  </Label>
                  <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                    <SelectTrigger className="bg-slate-900/80 border-2 border-purple-500/40 text-white h-14 text-lg rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 shadow-inner">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-2 border-purple-500/40 rounded-xl shadow-2xl shadow-purple-500/30 z-50 max-h-80">
                      {genres.map((genre) => (
                        <SelectItem 
                          key={genre.value} 
                          value={genre.value} 
                          className="text-white hover:bg-purple-700/60 focus:bg-purple-700/60 cursor-pointer py-3 px-4 text-base rounded-lg mx-1 my-1 transition-all duration-200 flex items-center gap-3"
                        >
                          <span className="text-xl">{genre.emoji}</span>
                          <span className={genre.color}>{genre.value}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mood" className="text-white text-lg font-semibold mb-4 block flex items-center gap-3">
                    <Smile className="w-6 h-6 text-cyan-400" />
                    How are you feeling right now?
                  </Label>
                  <Select value={currentMood} onValueChange={setCurrentMood}>
                    <SelectTrigger className="bg-slate-900/80 border-2 border-purple-500/40 text-white h-14 text-lg rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 shadow-inner">
                      <SelectValue placeholder="Select your current mood" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-2 border-purple-500/40 rounded-xl shadow-2xl shadow-purple-500/30 z-50 max-h-80">
                      {moods.map((mood) => (
                        <SelectItem 
                          key={mood.value} 
                          value={mood.value} 
                          className={`text-white hover:bg-purple-700/60 focus:bg-purple-700/60 cursor-pointer py-3 px-4 text-base rounded-lg mx-1 my-1 transition-all duration-200 ${mood.bg} hover:${mood.bg}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{mood.emoji}</span>
                            <span className={mood.color}>{mood.value}</span>
                          </div>
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
                className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white border-0 px-8 py-4 text-lg flex items-center gap-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={!isFormValid}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white font-semibold px-16 py-4 text-lg rounded-xl disabled:opacity-50 border-0 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Get Recommendations
                <Zap className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesForm;
