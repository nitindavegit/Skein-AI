
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-pulse">
          <Film className="w-24 h-24 mx-auto text-yellow-400 mb-6" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
          FilmFlow AI
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover your next favorite movie with AI-powered recommendations tailored to your taste, mood, and viewing history.
        </p>
        
        <div className="space-y-4 text-gray-400 mb-12">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Tell us about your last watched movie
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Share your preferred genre and current mood
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
            Get 10 personalized movie recommendations
          </p>
        </div>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-black font-semibold px-12 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Your Movie Journey
        </Button>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Personalized</h3>
            <p className="text-gray-300 text-sm">Recommendations based on your unique taste and viewing history</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-gray-300 text-sm">Advanced algorithms analyze your preferences for perfect matches</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Mood-Based</h3>
            <p className="text-gray-300 text-sm">Find movies that match exactly how you're feeling right now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
