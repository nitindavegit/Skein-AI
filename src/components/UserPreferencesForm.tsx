
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPreferences } from "@/pages/Index";
import { ArrowLeft, Film, ChevronRight, Heart, Sparkles } from "lucide-react";
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
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tell Us About Your
                <span className="block gradient-text">Movie Preferences</span>
              </h2>
              <p className="text-lg text-gray-600">Help our AI understand your unique taste in cinema</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="lastMovie" className="text-gray-900 text-base font-medium flex items-center gap-3">
                      <Film className="w-5 h-5 text-blue-500" />
                      What's the last movie that captivated you?
                    </Label>
                    <Input
                      id="lastMovie"
                      value={lastMovie}
                      onChange={(e) => setLastMovie(e.target.value)}
                      placeholder="e.g., Dune, The Batman, Parasite, Inception..."
                      className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="genre" className="text-gray-900 text-base font-medium flex items-center gap-3">
                      <Heart className="w-5 h-5 text-purple-500" />
                      What's your preferred genre?
                    </Label>
                    <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                      <SelectTrigger className="h-12 text-base border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg">
                        <SelectValue placeholder="Choose your favorite genre" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="mood" className="text-gray-900 text-base font-medium flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-pink-500" />
                      What's your current mood?
                    </Label>
                    <Select value={currentMood} onValueChange={setCurrentMood}>
                      <SelectTrigger className="h-12 text-base border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 rounded-lg">
                        <SelectValue placeholder="How are you feeling today?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg max-h-60">
                        {moods.map((mood) => (
                          <SelectItem key={mood} value={mood}>
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
                  className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={!isFormValid}
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300"
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
