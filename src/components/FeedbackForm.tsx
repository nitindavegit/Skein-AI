
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
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
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
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6">
              <div className="w-6 h-6 border-2 border-gray-800 rounded-full relative">
                <div className="absolute inset-1 border border-gray-800 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 tracking-wide">Share Your Thoughts</h2>
            <p className="text-lg text-gray-400 font-normal">Help us improve our recommendations</p>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-36 bg-gray-800 rounded flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                <Film className="w-6 h-6 text-gray-600" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-white mb-2">{movie.title}</h3>
                <p className="text-gray-400 mb-2 text-base">{movie.year} • {movie.genre}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-yellow-500 font-medium">{movie.rating}</span>
                  <span className="text-gray-500">/10</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">{movie.description}</p>
                <p className="text-gray-500 mt-3 text-sm">Directed by {movie.director}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <Label className="text-white text-lg font-medium mb-4 block">
                Are you interested in watching this movie?
              </Label>
              <div className="flex gap-4 justify-center">
                <Button
                  type="button"
                  onClick={() => setInterested(true)}
                  variant={interested === true ? "default" : "outline"}
                  className={`px-8 py-3 text-base rounded ${
                    interested === true
                      ? "bg-green-700 hover:bg-green-800 text-white border-0"
                      : "border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={() => setInterested(false)}
                  variant={interested === false ? "default" : "outline"}
                  className={`px-8 py-3 text-base rounded ${
                    interested === false
                      ? "bg-red-700 hover:bg-red-800 text-white border-0"
                      : "border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  No
                </Button>
              </div>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
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
                    className={`w-10 h-10 text-sm font-medium rounded ${
                      rating === value
                        ? "bg-yellow-600 hover:bg-yellow-700 text-black border-0"
                        : "border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                    }`}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <Label htmlFor="feedback" className="text-white text-lg font-medium mb-4 block">
                Additional feedback (optional)
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think about this recommendation..."
                className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 min-h-[120px] text-base rounded focus:border-yellow-500 focus:ring-yellow-500/20 resize-none"
              />
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
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-12 py-3 text-base rounded"
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
