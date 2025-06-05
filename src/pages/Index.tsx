
import { useState } from "react";
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
    setCurrentStep('preferences');
  };

  const handlePreferencesSubmit = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setCurrentStep('recommendations');
  };

  const handleMovieSelect = (movie: MovieRecommendation) => {
    setSelectedMovie(movie);
    setCurrentStep('feedback');
  };

  const handleFeedbackSubmit = () => {
    setCurrentStep('welcome');
    setUserPreferences(null);
    setRecommendations([]);
    setSelectedMovie(null);
  };

  const handleBackToRecommendations = () => {
    setCurrentStep('recommendations');
  };

  return (
    <div className="min-h-screen bg-black">
      {currentStep === 'welcome' && (
        <WelcomeScreen onStart={handleStartRecommendations} />
      )}
      
      {currentStep === 'preferences' && (
        <UserPreferencesForm 
          onSubmit={handlePreferencesSubmit}
          onBack={() => setCurrentStep('welcome')}
        />
      )}
      
      {currentStep === 'recommendations' && userPreferences && (
        <MovieRecommendations 
          preferences={userPreferences}
          onMovieSelect={handleMovieSelect}
          onBack={() => setCurrentStep('preferences')}
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
  );
};

export default Index;
