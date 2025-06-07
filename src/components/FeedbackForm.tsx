
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MovieRecommendation } from "@/pages/Index";
import { Film, Star, ThumbsUp, ThumbsDown, ArrowLeft, Calendar, Clock } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Share Your Thoughts</h2>
              <p className="text-xl text-gray-600">Help us improve our recommendations</p>
            </div>

            {/* Movie Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 mb-10 shadow-xl">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="w-full h-64 md:h-auto bg-gradient-to-br from-gray-100 to-violet-100 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
                  <Film className="w-12 h-12 text-violet-400" />
                </div>
                
                <div className="md:col-span-3 space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900">{movie.title}</h3>
                  
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
                    <span className="text-yellow-500 font-bold text-lg">{movie.rating}</span>
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
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <Label className="text-gray-900 text-xl font-semibold mb-6 block">
                  Are you interested in watching this movie?
                </Label>
                <div className="flex gap-6 justify-center">
                  <Button
                    type="button"
                    onClick={() => setInterested(true)}
                    variant={interested === true ? "default" : "outline"}
                    className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                      interested === true
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    Yes, I'm interested!
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setInterested(false)}
                    variant={interested === false ? "default" : "outline"}
                    className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                      interested === false
                        ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5 mr-2" />
                    Not for me
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <Label className="text-gray-900 text-xl font-semibold mb-6 block">
                  Rate this recommendation (1-10)
                </Label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      onClick={() => handleRatingClick(value)}
                      variant={rating === value ? "default" : "outline"}
                      className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                        rating === value
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black shadow-lg"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Additional Feedback */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <Label htmlFor="feedback" className="text-gray-900 text-xl font-semibold mb-6 block">
                  Additional feedback (optional)
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think about this recommendation..."
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 min-h-[120px] rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 justify-center">
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
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-12 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
