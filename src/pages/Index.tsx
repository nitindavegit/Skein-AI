
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
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
    setRecommendations([]);
    setSelectedMovie(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navigation bar */}
        <Navigation />
        
        {/* Main content with top padding to account for fixed navigation */}
        <div className="pt-20">
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
      </div>
    </ProtectedRoute>
  );
};

export default Index;
