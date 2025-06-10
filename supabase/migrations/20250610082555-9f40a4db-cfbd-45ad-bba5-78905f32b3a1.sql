
-- Create user_preferences table to store user movie preferences
CREATE TABLE public.user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  last_movie TEXT,
  preferred_genre TEXT,
  current_mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create movie_recommendations table to store generated recommendations
CREATE TABLE public.movie_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  preferences_id UUID REFERENCES public.user_preferences(id) ON DELETE CASCADE NOT NULL,
  movie_id TEXT NOT NULL,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  year INTEGER NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  description TEXT,
  poster TEXT,
  director TEXT,
  cast_members TEXT[], -- Changed from 'cast' to 'cast_members'
  recommendation_score DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_feedback table to store user feedback on recommendations
CREATE TABLE public.user_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  movie_recommendation_id UUID REFERENCES public.movie_recommendations(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  liked BOOLEAN,
  feedback_text TEXT,
  would_watch_again BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_watch_history table to track what users have watched
CREATE TABLE public.user_watch_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  movie_title TEXT NOT NULL,
  genre TEXT,
  rating_given INTEGER CHECK (rating_given >= 1 AND rating_given <= 5),
  watched_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movie_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_watch_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences" ON public.user_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for movie_recommendations
CREATE POLICY "Users can view their own recommendations" ON public.movie_recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recommendations" ON public.movie_recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendations" ON public.movie_recommendations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recommendations" ON public.movie_recommendations
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_feedback
CREATE POLICY "Users can view their own feedback" ON public.user_feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback" ON public.user_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own feedback" ON public.user_feedback
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own feedback" ON public.user_feedback
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_watch_history
CREATE POLICY "Users can view their own watch history" ON public.user_watch_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own watch history" ON public.user_watch_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own watch history" ON public.user_watch_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own watch history" ON public.user_watch_history
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX idx_movie_recommendations_user_id ON public.movie_recommendations(user_id);
CREATE INDEX idx_movie_recommendations_preferences_id ON public.movie_recommendations(preferences_id);
CREATE INDEX idx_user_feedback_user_id ON public.user_feedback(user_id);
CREATE INDEX idx_user_feedback_movie_recommendation_id ON public.user_feedback(movie_recommendation_id);
CREATE INDEX idx_user_watch_history_user_id ON public.user_watch_history(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
