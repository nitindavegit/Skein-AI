import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserMenu from "@/components/UserMenu";
import WelcomeScreen from "@/components/WelcomeScreen";
import UserPreferencesForm from "@/components/UserPreferencesForm";
import MovieRecommendations from "@/components/MovieRecommendations";
import FeedbackForm from "@/components/FeedbackForm";

export interface UserPreferences {
  lastMovie: string;
  preferredGenre: string;
  currentMood: string;
}

export interface MovieRecommendation {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  description: string;
  poster: string;
  director: string;
  cast: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'preferences' | 'recommendations' | 'feedback'>('welcome');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieRecommendation | null>(null);

  const handleStartRecommendations = () => {
    console.log("Starting recommendations flow");
    setCurrentStep('preferences');
  };

  const handlePreferencesSubmit = (preferences: UserPreferences) => {
    console.log("Preferences submitted:", preferences);
    setUserPreferences(preferences);
    // Clear previous recommendations when new preferences are submitted
    setRecommendations([]);
    setCurrentStep('recommendations');
  };

  const handleMovieSelect = (movie: MovieRecommendation) => {
    console.log("Movie selected for feedback:", movie);
    setSelectedMovie(movie);
    setCurrentStep('feedback');
  };

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted, returning to welcome");
    // Reset the entire flow after feedback submission
    setCurrentStep('welcome');
    setUserPreferences(null);
    setRecommendations([]);
    setSelectedMovie(null);
  };

  const handleBackToRecommendations = () => {
    console.log("Going back to recommendations");
    setCurrentStep('recommendations');
    setSelectedMovie(null);
  };

  const handleBackToWelcome = () => {
    console.log("Going back to welcome");
    setCurrentStep('welcome');
    setUserPreferences(null);
    setRecommendations([]);
    setSelectedMovie(null);
  };

  const handleBackToPreferences = () => {
    console.log("Going back to preferences");
    setCurrentStep('preferences');
    // Keep userPreferences but clear recommendations to get fresh ones
    setRecommendations([]);
    setSelectedMovie(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* User menu in top right corner */}
        <div className="absolute top-4 right-4 z-10">
          <UserMenu />
        </div>
        
        {currentStep === 'welcome' && (
          <WelcomeScreen onStart={handleStartRecommendations} />
        )}
        
        {currentStep === 'preferences' && (
          <UserPreferencesForm 
            onSubmit={handlePreferencesSubmit}
            onBack={handleBackToWelcome}
          />
        )}
        
        {currentStep === 'recommendations' && userPreferences && (
          <MovieRecommendations 
            preferences={userPreferences}
            onMovieSelect={handleMovieSelect}
            onBack={handleBackToPreferences}
            recommendations={recommendations}
            setRecommendations={setRecommendations}
          />
        )}
        
        {currentStep === 'feedback' && selectedMovie && (
          <FeedbackForm 
            movie={selectedMovie}
            onSubmit={handleFeedbackSubmit}
            onBack={handleBackToRecommendations}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Index;
