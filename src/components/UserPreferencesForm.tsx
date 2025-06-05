import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPreferences } from "@/pages/Index";
import { Film, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Film className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-4xl font-bold text-white mb-2">Tell Us About You</h2>
          <p className="text-gray-300">Help us understand your movie preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <div className="space-y-6">
              <div>
                <Label htmlFor="lastMovie" className="text-white text-lg font-semibold mb-3 block">
                  What's the last movie you watched?
                </Label>
                <Input
                  id="lastMovie"
                  value={lastMovie}
                  onChange={(e) => setLastMovie(e.target.value)}
                  placeholder="e.g., The Dark Knight, Inception, La La Land..."
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300 text-lg p-4 h-14"
                />
              </div>

              <div>
                <Label htmlFor="genre" className="text-white text-lg font-semibold mb-3 block">
                  What genre are you in the mood for?
                </Label>
                <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white h-14 text-lg">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/30 z-50">
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre} className="text-white hover:bg-white/20">
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mood" className="text-white text-lg font-semibold mb-3 block">
                  How are you feeling right now?
                </Label>
                <Select value={currentMood} onValueChange={setCurrentMood}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white h-14 text-lg">
                    <SelectValue placeholder="Select your current mood" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/30 z-50">
                    {moods.map((mood) => (
                      <SelectItem key={mood} value={mood} className="text-white hover:bg-white/20">
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
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-3 text-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button 
              type="submit"
              disabled={!isFormValid}
              className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-black font-semibold px-12 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
            >
              Get My Recommendations
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPreferencesForm;
