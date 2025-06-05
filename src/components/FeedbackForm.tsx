
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MovieRecommendation } from "@/pages/Index";
import { Film, Star, ThumbsUp, ThumbsDown, ArrowLeft, Play } from "lucide-react";

interface FeedbackFormProps {
  movie: MovieRecommendation;
  onSubmit: () => void;
  onBack: () => void;
}

const FeedbackForm = ({ movie, onSubmit, onBack }: FeedbackFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [interested, setInterested] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", { movie: movie.title, rating, feedback, interested });
    onSubmit();
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1518877593221-1f28583780b4?q=80&w=5103&h=3402')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Share Your Thoughts</h2>
            <p className="text-xl text-gray-300 font-light">Help us refine our recommendations</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl mb-10">
            <div className="flex items-start gap-8">
              <div className="w-32 h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                <Film className="w-10 h-10 text-gray-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{movie.title}</h3>
                <p className="text-gray-300 mb-3 text-lg font-light">{movie.year} • {movie.genre}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="text-amber-400 font-semibold text-lg">{movie.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                <p className="text-gray-500 mt-4 font-light">Directed by {movie.director}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <Label className="text-white text-xl font-medium mb-6 block tracking-wide">
                Are you interested in watching this movie?
              </Label>
              <div className="flex gap-6 justify-center">
                <Button
                  type="button"
                  onClick={() => setInterested(true)}
                  variant={interested === true ? "default" : "outline"}
                  className={`px-10 py-4 text-lg rounded-xl transition-all duration-300 ${
                    interested === true
                      ? "bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg"
                      : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                  }`}
                >
                  <ThumbsUp className="w-5 h-5 mr-3" />
                  Yes, I'm interested
                </Button>
                <Button
                  type="button"
                  onClick={() => setInterested(false)}
                  variant={interested === false ? "default" : "outline"}
                  className={`px-10 py-4 text-lg rounded-xl transition-all duration-300 ${
                    interested === false
                      ? "bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg"
                      : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                  }`}
                >
                  <ThumbsDown className="w-5 h-5 mr-3" />
                  Not for me
                </Button>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <Label className="text-white text-xl font-medium mb-6 block tracking-wide">
                Rate this recommendation (1-10)
              </Label>
              <div className="flex gap-3 justify-center flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    variant={rating === value ? "default" : "outline"}
                    className={`w-14 h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      rating === value
                        ? "bg-amber-500 hover:bg-amber-600 text-black border-0 shadow-lg"
                        : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                    }`}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <Label htmlFor="feedback" className="text-white text-xl font-medium mb-6 block tracking-wide">
                Additional feedback (optional)
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think about this recommendation..."
                className="bg-black/30 border-white/20 text-white placeholder-gray-400 min-h-[140px] text-lg rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20 resize-none"
              />
            </div>

            <div className="flex gap-6 justify-center">
              <Button 
                type="button"
                onClick={onBack}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 text-lg flex items-center gap-3 rounded-xl transition-all duration-300 hover:border-white/40"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Recommendations
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold px-16 py-4 text-lg rounded-xl transition-all duration-500 transform hover:scale-105 shadow-xl border-0"
              >
                Submit Feedback
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
