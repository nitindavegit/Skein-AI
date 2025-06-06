
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MovieRecommendation } from "@/pages/Index";
import { Film, Star, ThumbsUp, ThumbsDown, ArrowLeft, Play, Heart, Sparkles } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.95)), url('https://images.unsplash.com/photo-1489599117334-b0b5d7f7cd1c?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/40 to-pink-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/40">
              <Heart className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text mb-4 tracking-wide">
              💭 Share Your Thoughts
            </h2>
            <p className="text-xl text-slate-300 font-light flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              Help us improve our recommendations
              <Sparkles className="w-6 h-6 text-pink-400" />
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 mb-10 shadow-2xl shadow-purple-500/20">
            <div className="flex items-start gap-8">
              <div className="w-32 h-48 bg-gradient-to-br from-slate-700 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group shadow-xl">
                <Film className="w-8 h-8 text-purple-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-3 flex items-center gap-2">
                  🎬 {movie.title}
                </h3>
                <p className="text-slate-400 mb-3 text-lg flex items-center gap-2">
                  <span>📅</span> {movie.year} • <span>🎭</span> {movie.genre}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-bold text-lg">{movie.rating}</span>
                  <span className="text-slate-500 text-lg">/10</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">{movie.description}</p>
                <p className="text-slate-500 flex items-center gap-2">
                  <span>🎬</span> Directed by {movie.director}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <Label className="text-white text-xl font-bold mb-6 block flex items-center gap-3">
                <ThumbsUp className="w-6 h-6 text-green-400" />
                Are you interested in watching this movie?
              </Label>
              <div className="flex gap-6 justify-center">
                <Button
                  type="button"
                  onClick={() => setInterested(true)}
                  variant={interested === true ? "default" : "outline"}
                  className={`px-10 py-4 text-lg rounded-xl transition-all duration-300 ${
                    interested === true
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-xl shadow-green-500/30 transform scale-105"
                      : "border-2 border-purple-500/30 text-white hover:bg-purple-700/50 bg-transparent backdrop-blur-sm"
                  }`}
                >
                  <ThumbsUp className="w-5 h-5 mr-3" />
                  😍 Yes, I'm interested!
                </Button>
                <Button
                  type="button"
                  onClick={() => setInterested(false)}
                  variant={interested === false ? "default" : "outline"}
                  className={`px-10 py-4 text-lg rounded-xl transition-all duration-300 ${
                    interested === false
                      ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border-0 shadow-xl shadow-red-500/30 transform scale-105"
                      : "border-2 border-purple-500/30 text-white hover:bg-purple-700/50 bg-transparent backdrop-blur-sm"
                  }`}
                >
                  <ThumbsDown className="w-5 h-5 mr-3" />
                  😐 Not for me
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <Label className="text-white text-xl font-bold mb-6 block flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                Rate this recommendation (1-10)
              </Label>
              <div className="flex gap-3 justify-center flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    variant={rating === value ? "default" : "outline"}
                    className={`w-12 h-12 text-lg font-bold rounded-xl transition-all duration-300 ${
                      rating === value
                        ? "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black border-0 shadow-xl shadow-yellow-500/40 transform scale-110"
                        : "border-2 border-purple-500/30 text-white hover:bg-purple-700/50 bg-transparent backdrop-blur-sm"
                    }`}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <Label htmlFor="feedback" className="text-white text-xl font-bold mb-6 block flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                💬 Additional feedback (optional)
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think about this recommendation... 🎭✨"
                className="bg-slate-900/80 border-2 border-purple-500/40 text-white placeholder-slate-400 min-h-[140px] text-lg rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 resize-none transition-all duration-300 shadow-inner"
              />
            </div>

            <div className="flex gap-6 justify-center">
              <Button 
                type="button"
                onClick={onBack}
                className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white border-0 px-8 py-4 text-lg flex items-center gap-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                🔙 Back
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white font-bold px-16 py-4 text-lg rounded-xl border-0 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                ✨ Submit Feedback
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
