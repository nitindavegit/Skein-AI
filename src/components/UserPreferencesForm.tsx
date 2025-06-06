
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
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6">
              <div className="w-6 h-6 border-2 border-gray-800 rounded-full relative">
                <div className="absolute inset-1 border border-gray-800 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 tracking-wide">Tell Us About You</h2>
            <p className="text-lg text-gray-400 font-normal">Help us find your perfect match</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
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
                    className="bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 text-base p-4 h-12 rounded focus:border-yellow-500 focus:ring-yellow-500/20"
                  />
                </div>

                <div>
                  <Label htmlFor="genre" className="text-white text-base font-medium mb-3 block">
                    What genre are you in the mood for?
                  </Label>
                  <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                    <SelectTrigger className="bg-gray-800/80 border-gray-700 text-white h-12 text-base rounded focus:border-yellow-500 focus:ring-yellow-500/20">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 backdrop-blur-sm z-50">
                      {genres.map((genre) => (
                        <SelectItem 
                          key={genre} 
                          value={genre} 
                          className="text-white hover:bg-gray-800 focus:bg-gray-800 cursor-pointer bg-gray-900"
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
                    <SelectTrigger className="bg-gray-800/80 border-gray-700 text-white h-12 text-base rounded focus:border-yellow-500 focus:ring-yellow-500/20">
                      <SelectValue placeholder="Select your current mood" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 backdrop-blur-sm z-50">
                      {moods.map((mood) => (
                        <SelectItem 
                          key={mood} 
                          value={mood} 
                          className="text-white hover:bg-gray-800 focus:bg-gray-800 cursor-pointer bg-gray-900"
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
                className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-6 py-3 text-base flex items-center gap-2 rounded"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={!isFormValid}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-12 py-3 text-base rounded disabled:opacity-50 disabled:hover:bg-red-600"
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
