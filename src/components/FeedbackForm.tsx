
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MovieRecommendation } from "@/pages/Index";
import { ArrowLeft, Star, Heart, Clock, Calendar, ThumbsUp, ThumbsDown } from "lucide-react";
import { movieService } from "@/services/movieService";
import { useToast } from "@/hooks/use-toast";
import Logo from "./Logo";

interface FeedbackFormProps {
  movie: MovieRecommendation;
  onSubmit: () => void;
  onBack: () => void;
}

const FeedbackForm = ({ movie, onSubmit, onBack }: FeedbackFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [wouldWatchAgain, setWouldWatchAgain] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Save feedback to database
      const success = await movieService.saveFeedback(movie.id, {
        rating,
        liked,
        feedback_text: feedbackText || null,
        would_watch_again: wouldWatchAgain
      });

      if (success) {
        toast({
          title: "Feedback Submitted!",
          description: "Thank you for your feedback. This will help improve future recommendations.",
        });
        onSubmit();
      } else {
        throw new Error("Failed to save feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How was
                <span className="block gradient-text">{movie.title}?</span>
              </h2>
              <p className="text-lg text-gray-600">Your feedback helps us recommend better movies for you</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Movie Details */}
              <Card className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {movie.poster ? (
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <Clock className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-xl text-gray-900">{movie.title}</h3>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span className="text-purple-600">{movie.genre}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-600 font-semibold">{movie.rating}</span>
                      <span className="text-gray-400">/10</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">{movie.description}</p>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm pt-2 border-t border-gray-100">
                      <Clock className="w-3 h-3" />
                      <span>Directed by {movie.director}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Form */}
              <Card className="bg-white border border-gray-200 rounded-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Rating */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-gray-900">Rate this movie</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleStarClick(star)}
                            className="transition-all duration-200 hover:scale-110"
                          >
                            <Star 
                              className={`w-8 h-8 ${
                                star <= rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Liked/Disliked */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-gray-900">Did you enjoy it?</Label>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={liked === true ? "default" : "outline"}
                          onClick={() => setLiked(true)}
                          className="flex items-center gap-2"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Yes, I liked it
                        </Button>
                        <Button
                          type="button"
                          variant={liked === false ? "default" : "outline"}
                          onClick={() => setLiked(false)}
                          className="flex items-center gap-2"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          Not really
                        </Button>
                      </div>
                    </div>

                    {/* Would watch again */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-gray-900">Would you watch it again?</Label>
                      <RadioGroup
                        value={wouldWatchAgain === null ? "" : wouldWatchAgain.toString()}
                        onValueChange={(value) => setWouldWatchAgain(value === "true")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="watch-again-yes" />
                          <Label htmlFor="watch-again-yes">Yes, definitely</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="watch-again-no" />
                          <Label htmlFor="watch-again-no">No, once was enough</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Additional feedback */}
                    <div className="space-y-4">
                      <Label htmlFor="feedback" className="text-lg font-semibold text-gray-900">
                        Additional thoughts (optional)
                      </Label>
                      <Textarea
                        id="feedback"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="What did you think about the movie? What did you like or dislike?"
                        className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* Submit buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button 
                        type="button"
                        onClick={onBack}
                        variant="outline"
                        className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Recommendations
                      </Button>
                      <Button 
                        type="submit"
                        disabled={loading || rating === 0}
                        className="flex-1 h-12 bg-primary hover:bg-primary/90 disabled:opacity-50"
                      >
                        {loading ? "Submitting..." : "Submit Feedback"}
                        <Heart className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
