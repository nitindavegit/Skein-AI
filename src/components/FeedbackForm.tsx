
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MovieRecommendation } from "@/pages/Index";
import { Film, Star, ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Film className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-4xl font-bold text-white mb-2">Share Your Thoughts</h2>
          <p className="text-gray-300">Help us improve our recommendations</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-36 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Film className="w-8 h-8 text-gray-400" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
              <p className="text-gray-300 mb-2">{movie.year} • {movie.genre}</p>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                <span className="text-gray-400">/10</span>
              </div>
              <p className="text-gray-300 text-sm">{movie.description}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Label className="text-white text-lg font-semibold mb-4 block">
              Are you interested in watching this movie?
            </Label>
            <div className="flex gap-4 justify-center">
              <Button
                type="button"
                onClick={() => setInterested(true)}
                variant={interested === true ? "default" : "outline"}
                className={`px-8 py-3 ${
                  interested === true
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "border-white/30 text-white hover:bg-white/20"
                }`}
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                Yes, I'm interested
              </Button>
              <Button
                type="button"
                onClick={() => setInterested(false)}
                variant={interested === false ? "default" : "outline"}
                className={`px-8 py-3 ${
                  interested === false
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "border-white/30 text-white hover:bg-white/20"
                }`}
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                Not for me
              </Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Label className="text-white text-lg font-semibold mb-4 block">
              Rate this recommendation (1-10)
            </Label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <Button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  variant={rating === value ? "default" : "outline"}
                  className={`w-12 h-12 ${
                    rating === value
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : "border-white/30 text-white hover:bg-white/20"
                  }`}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Label htmlFor="feedback" className="text-white text-lg font-semibold mb-4 block">
              Additional feedback (optional)
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think about this recommendation..."
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 min-h-[120px]"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <Button 
              type="button"
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-3 text-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Recommendations
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-black font-semibold px-12 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit Feedback
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
