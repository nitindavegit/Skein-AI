
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
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
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-light text-white mb-3 tracking-wide">Share Your Thoughts</h2>
            <p className="text-lg text-slate-300 font-light">Help us improve our recommendations</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 mb-8 shadow-lg shadow-purple-500/10">
            <div className="flex items-start gap-6">
              <div className="w-24 h-36 bg-gradient-to-br from-slate-700 to-purple-800 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                <Film className="w-6 h-6 text-purple-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-white mb-2">{movie.title}</h3>
                <p className="text-slate-400 mb-2 text-base">{movie.year} • {movie.genre}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-medium">{movie.rating}</span>
                  <span className="text-slate-500">/10</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">{movie.description}</p>
                <p className="text-slate-500 mt-3 text-sm">Directed by {movie.director}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <Label className="text-white text-lg font-medium mb-4 block">
                Are you interested in watching this movie?
              </Label>
              <div className="flex gap-4 justify-center">
                <Button
                  type="button"
                  onClick={() => setInterested(true)}
                  variant={interested === true ? "default" : "outline"}
                  className={`px-8 py-3 text-base rounded-md ${
                    interested === true
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg shadow-green-500/25"
                      : "border-purple-500/30 text-white hover:bg-purple-800/50 bg-transparent"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={() => setInterested(false)}
                  variant={interested === false ? "default" : "outline"}
                  className={`px-8 py-3 text-base rounded-md ${
                    interested === false
                      ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0 shadow-lg shadow-red-500/25"
                      : "border-purple-500/30 text-white hover:bg-purple-800/50 bg-transparent"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  No
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <Label className="text-white text-lg font-medium mb-4 block">
                Rate this recommendation (1-10)
              </Label>
              <div className="flex gap-2 justify-center flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    variant={rating === value ? "default" : "outline"}
                    className={`w-10 h-10 text-sm font-medium rounded-md ${
                      rating === value
                        ? "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black border-0 shadow-lg shadow-yellow-500/25"
                        : "border-purple-500/30 text-white hover:bg-purple-800/50 bg-transparent"
                    }`}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <Label htmlFor="feedback" className="text-white text-lg font-medium mb-4 block">
                Additional feedback (optional)
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think about this recommendation..."
                className="bg-slate-900/60 border-purple-500/30 text-white placeholder-slate-400 min-h-[120px] text-base rounded-md focus:border-purple-400 focus:ring-purple-400/20 resize-none"
              />
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-12 py-3 text-base rounded-md border-0 shadow-lg shadow-purple-500/25"
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
