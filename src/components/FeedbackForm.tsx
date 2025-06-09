
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MovieRecommendation } from "@/pages/Index";
import { Film, Star, ThumbsUp, ThumbsDown, ArrowLeft, Calendar, Clock } from "lucide-react";
import Logo from "./Logo";

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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Share Your Thoughts</h2>
              <p className="text-lg text-gray-600">Your feedback helps us improve our recommendations</p>
            </div>

            {/* Movie Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-10 shadow-sm">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="w-full h-64 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <Film className="w-12 h-12 text-gray-400" />
                </div>
                
                <div className="md:col-span-3 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">{movie.title}</h3>
                  
                  <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.year}</span>
                    </div>
                    <span>•</span>
                    <span>{movie.genre}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-yellow-600 font-bold text-lg">{movie.rating}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{movie.description}</p>
                  
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Directed by {movie.director}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Interest Question */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <Label className="text-gray-900 text-lg font-semibold mb-6 block">
                  Are you interested in watching this movie?
                </Label>
                <div className="flex gap-4 justify-center">
                  <Button
                    type="button"
                    onClick={() => setInterested(true)}
                    variant={interested === true ? "default" : "outline"}
                    className={`h-12 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      interested === true
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Yes, I'm interested!
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setInterested(false)}
                    variant={interested === false ? "default" : "outline"}
                    className={`h-12 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      interested === false
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Not for me
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <Label className="text-gray-900 text-lg font-semibold mb-6 block">
                  Rate this recommendation (1-10)
                </Label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      onClick={() => handleRatingClick(value)}
                      variant={rating === value ? "default" : "outline"}
                      className={`w-12 h-12 rounded-lg font-bold transition-all duration-300 ${
                        rating === value
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Additional Feedback */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <Label htmlFor="feedback" className="text-gray-900 text-lg font-semibold mb-6 block">
                  Additional feedback (optional)
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think about this recommendation..."
                  className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 min-h-[120px] rounded-lg resize-none"
                />
              </div>

              {/* Action Buttons */}
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
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
