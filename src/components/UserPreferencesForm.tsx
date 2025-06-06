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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-light text-white mb-3 tracking-wide">Tell Us About You</h2>
            <p className="text-lg text-slate-300 font-light">Help us find your perfect match</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="lastMovie" className="text-white text-base font-medium mb-3 block">
                    What's the last movie you watched?
                  </Label>
                  <Input
                    id="lastMovie"
                    value={lastMovie}
                    onChange={(e) => setLastMovie(e.target.value)}
                    placeholder="e.g., Dune, The Batman, Parasite..."
                    className="bg-slate-900/60 border-purple-500/30 text-white placeholder-slate-400 text-base p-4 h-12 rounded-md focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>

                <div>
                  <Label htmlFor="genre" className="text-white text-base font-medium mb-3 block">
                    What genre are you in the mood for?
                  </Label>
                  <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                    <SelectTrigger className="bg-slate-900/60 border-purple-500/30 text-white h-12 text-base rounded-md focus:border-purple-400 focus:ring-purple-400/20">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-br from-slate-800 to-purple-900 border-purple-500/30 backdrop-blur-sm z-50">
                      {genres.map((genre) => (
                        <SelectItem 
                          key={genre} 
                          value={genre} 
                          className="text-white hover:bg-purple-800/50 focus:bg-purple-800/50 cursor-pointer"
                        >
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mood" className="text-white text-base font-medium mb-3 block">
                    How are you feeling right now?
                  </Label>
                  <Select value={currentMood} onValueChange={setCurrentMood}>
                    <SelectTrigger className="bg-slate-900/60 border-purple-500/30 text-white h-12 text-base rounded-md focus:border-purple-400 focus:ring-purple-400/20">
                      <SelectValue placeholder="Select your current mood" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-br from-slate-800 to-purple-900 border-purple-500/30 backdrop-blur-sm z-50">
                      {moods.map((mood) => (
                        <SelectItem 
                          key={mood} 
                          value={mood} 
                          className="text-white hover:bg-purple-800/50 focus:bg-purple-800/50 cursor-pointer"
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
                className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white border-0 px-6 py-3 text-base flex items-center gap-2 rounded-md shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={!isFormValid}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-12 py-3 text-base rounded-md disabled:opacity-50 border-0 shadow-lg shadow-purple-500/25"
              >
                Get Recommendations
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesForm;
