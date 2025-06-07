
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPreferences } from "@/pages/Index";
import { ArrowLeft, Film, ChevronRight, Sparkles } from "lucide-react";
import SplineScene from "./SplineScene";

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <SplineScene 
          scene="https://prod.spline.design/qh2NMudMGMr8Av2s/scene.splinecode"
          className="w-full h-full opacity-20"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent_50%)]" />
            </div>
          }
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tell Us About Your Taste</h2>
              <p className="text-xl text-gray-600">Help us understand your preferences for better recommendations</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="space-y-8">
                  <div>
                    <Label htmlFor="lastMovie" className="text-gray-900 text-lg font-medium mb-4 block flex items-center gap-3">
                      <Film className="w-5 h-5 text-violet-500" />
                      What's the last movie you watched?
                    </Label>
                    <Input
                      id="lastMovie"
                      value={lastMovie}
                      onChange={(e) => setLastMovie(e.target.value)}
                      placeholder="e.g., Dune, The Batman, Parasite..."
                      className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 text-lg h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="genre" className="text-gray-900 text-lg font-medium mb-4 block">
                      What genre are you in the mood for?
                    </Label>
                    <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 h-12 text-lg rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 rounded-xl">
                        {genres.map((genre) => (
                          <SelectItem 
                            key={genre} 
                            value={genre} 
                            className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          >
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mood" className="text-gray-900 text-lg font-medium mb-4 block">
                      How are you feeling right now?
                    </Label>
                    <Select value={currentMood} onValueChange={setCurrentMood}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 h-12 text-lg rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
                        <SelectValue placeholder="Select your current mood" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 rounded-xl max-h-60">
                        {moods.map((mood) => (
                          <SelectItem 
                            key={mood} 
                            value={mood} 
                            className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
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
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-8 py-3 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={!isFormValid}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-12 py-3 rounded-xl disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Recommendations
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
