
import { supabase } from "@/integrations/supabase/client";
import { UserPreferences, MovieRecommendation } from "@/pages/Index";

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string;
}

interface TMDBCredits {
  cast: Array<{
    name: string;
  }>;
  crew: Array<{
    name: string;
    job: string;
  }>;
}

// Genre mapping
const GENRE_MAP: Record<string, number> = {
  "Action": 28,
  "Adventure": 12,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Documentary": 99,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "Horror": 27,
  "Mystery": 9648,
  "Romance": 10749,
  "Science Fiction": 878,
  "Thriller": 53,
  "War": 10752,
  "Western": 37
};

class MovieService {
  private async getOpenAIRecommendations(preferences: UserPreferences): Promise<string[]> {
    try {
      const { data: { OPENAI_API_KEY } } = await supabase.functions.invoke('get-secrets');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a movie recommendation expert. Based on user preferences, suggest 15 movie titles that match their taste. Return only a JSON array of movie titles, nothing else.'
            },
            {
              role: 'user',
              content: `Based on these preferences:
                - Last movie enjoyed: ${preferences.lastMovie}
                - Preferred genre: ${preferences.preferredGenre}
                - Current mood: ${preferences.currentMood}
                
                Suggest 15 movie titles that would appeal to this user. Focus on ${preferences.preferredGenre} movies that match the ${preferences.currentMood} mood.`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('OpenAI API request failed');
      }

      const data = await response.json();
      const suggestions = JSON.parse(data.choices[0].message.content);
      return Array.isArray(suggestions) ? suggestions : [];
    } catch (error) {
      console.error('OpenAI API error:', error);
      return [];
    }
  }

  private async getTMDBMovieDetails(movieTitle: string): Promise<TMDBMovie | null> {
    try {
      const { data: { TMDB_API_KEY } } = await supabase.functions.invoke('get-secrets');
      
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}&language=en-US`
      );
      
      if (!searchResponse.ok) return null;
      
      const searchData = await searchResponse.json();
      return searchData.results?.[0] || null;
    } catch (error) {
      console.error('TMDB search error:', error);
      return null;
    }
  }

  private async getTMDBMovieCredits(movieId: number): Promise<TMDBCredits | null> {
    try {
      const { data: { TMDB_API_KEY } } = await supabase.functions.invoke('get-secrets');
      
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
      );
      
      if (!response.ok) return null;
      
      return await response.json();
    } catch (error) {
      console.error('TMDB credits error:', error);
      return null;
    }
  }

  private async discoverMoviesByGenre(preferences: UserPreferences): Promise<TMDBMovie[]> {
    try {
      const { data: { TMDB_API_KEY } } = await supabase.functions.invoke('get-secrets');
      const genreId = GENRE_MAP[preferences.preferredGenre];
      
      if (!genreId) return [];
      
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=1000&language=en-US&page=1`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('TMDB discover error:', error);
      return [];
    }
  }

  async saveUserPreferences(preferences: UserPreferences): Promise<string | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_preferences')
        .insert({
          user_id: user.id,
          last_movie: preferences.lastMovie,
          preferred_genre: preferences.preferredGenre,
          current_mood: preferences.currentMood
        })
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  }

  async saveMovieRecommendations(preferencesId: string, recommendations: MovieRecommendation[]): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const recommendationsData = recommendations.map(movie => ({
        user_id: user.id,
        preferences_id: preferencesId,
        movie_id: movie.id,
        title: movie.title,
        genre: movie.genre,
        year: movie.year,
        rating: movie.rating,
        description: movie.description,
        poster: movie.poster,
        director: movie.director,
        cast_members: movie.cast,
        recommendation_score: Math.random() * 100
      }));

      const { error } = await supabase
        .from('movie_recommendations')
        .insert(recommendationsData);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving recommendations:', error);
    }
  }

  async generateRecommendations(preferences: UserPreferences): Promise<MovieRecommendation[]> {
    try {
      const preferencesId = await this.saveUserPreferences(preferences);
      
      const aiSuggestions = await this.getOpenAIRecommendations(preferences);
      const genreMovies = await this.discoverMoviesByGenre(preferences);
      
      const recommendations: MovieRecommendation[] = [];
      
      for (const suggestion of aiSuggestions.slice(0, 8)) {
        const tmdbMovie = await this.getTMDBMovieDetails(suggestion);
        if (tmdbMovie) {
          const credits = await this.getTMDBMovieCredits(tmdbMovie.id);
          const director = credits?.crew.find(person => person.job === 'Director')?.name || 'Unknown';
          const cast = credits?.cast.slice(0, 5).map(actor => actor.name) || [];
          
          recommendations.push({
            id: tmdbMovie.id.toString(),
            title: tmdbMovie.title,
            genre: preferences.preferredGenre,
            year: new Date(tmdbMovie.release_date).getFullYear(),
            rating: Math.round(tmdbMovie.vote_average * 10) / 10,
            description: tmdbMovie.overview,
            poster: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : '',
            director,
            cast
          });
        }
      }
      
      for (const movie of genreMovies.slice(0, 10 - recommendations.length)) {
        if (!recommendations.find(r => r.id === movie.id.toString())) {
          const credits = await this.getTMDBMovieCredits(movie.id);
          const director = credits?.crew.find(person => person.job === 'Director')?.name || 'Unknown';
          const cast = credits?.cast.slice(0, 5).map(actor => actor.name) || [];
          
          recommendations.push({
            id: movie.id.toString(),
            title: movie.title,
            genre: preferences.preferredGenre,
            year: new Date(movie.release_date).getFullYear(),
            rating: Math.round(movie.vote_average * 10) / 10,
            description: movie.overview,
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
            director,
            cast
          });
        }
      }
      
      if (preferencesId) {
        await this.saveMovieRecommendations(preferencesId, recommendations);
      }
      
      return recommendations.slice(0, 10);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  async getUserFeedback(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select(`
          *,
          movie_recommendations (
            title,
            genre,
            rating
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user feedback:', error);
      return [];
    }
  }

  async saveFeedback(movieId: string, feedbackData: {
    rating?: number;
    liked?: boolean;
    feedback_text?: string;
    would_watch_again?: boolean;
  }): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Find the movie recommendation record
      const { data: movieRec, error: findError } = await supabase
        .from('movie_recommendations')
        .select('id')
        .eq('movie_id', movieId)
        .eq('user_id', user.id)
        .single();

      if (findError || !movieRec) {
        console.error('Movie recommendation not found:', findError);
        return false;
      }

      const { error } = await supabase
        .from('user_feedback')
        .insert({
          user_id: user.id,
          movie_recommendation_id: movieRec.id,
          ...feedbackData
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving feedback:', error);
      return false;
    }
  }
}

export const movieService = new MovieService();
