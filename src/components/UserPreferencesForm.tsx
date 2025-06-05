
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPreferences } from "@/pages/Index";
import { ArrowLeft, Film } from "lucide-react";

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
    "Science Fiction", "Sci-Fi", "Thriller", "War", "Western", "Adult",
    "Biography", "History", "Music", "Musical", "Sport"
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=3880&h=2586')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Tell Us About You</h2>
            <p className="text-xl text-gray-300 font-light">Help us craft your perfect viewing experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
              <div className="space-y-8">
                <div>
                  <Label htmlFor="lastMovie" className="text-white text-lg font-medium mb-4 block tracking-wide">
                    What's the last movie you watched?
                  </Label>
                  <Input
                    id="lastMovie"
                    value={lastMovie}
                    onChange={(e) => setLastMovie(e.target.value)}
                    placeholder="e.g., Dune, The Batman, Parasite..."
                    className="bg-black/30 border-white/20 text-white placeholder-gray-400 text-lg p-6 h-16 rounded-xl focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <Label htmlFor="genre" className="text-white text-lg font-medium mb-4 block tracking-wide">
                    What genre are you in the mood for?
                  </Label>
                  <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                    <SelectTrigger className="bg-black/30 border-white/20 text-white h-16 text-lg rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20">
                      <SelectValue placeholder="Select a genre" className="text-gray-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-white/20 backdrop-blur-xl">
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre} className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mood" className="text-white text-lg font-medium mb-4 block tracking-wide">
                    How are you feeling right now?
                  </Label>
                  <Select value={currentMood} onValueChange={setCurrentMood}>
                    <SelectTrigger className="bg-black/30 border-white/20 text-white h-16 text-lg rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20">
                      <SelectValue placeholder="Select your current mood" className="text-gray-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-white/20 backdrop-blur-xl">
                      {moods.map((mood) => (
                        <SelectItem key={mood} value={mood} className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                          {mood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-6 justify-center">
              <Button 
                type="button"
                onClick={onBack}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 text-lg flex items-center gap-3 rounded-xl transition-all duration-300 hover:border-white/40"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={!isFormValid}
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold px-16 py-4 text-lg rounded-xl transition-all duration-500 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:hover:scale-100 border-0"
              >
                Get My Recommendations
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesForm;
