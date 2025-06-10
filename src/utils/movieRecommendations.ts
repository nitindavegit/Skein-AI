
import { UserPreferences, MovieRecommendation } from "@/pages/Index";
import { movieService } from "@/services/movieService";

export const generateMovieRecommendations = async (preferences: UserPreferences): Promise<MovieRecommendation[]> => {
  console.log("Generating recommendations with preferences:", preferences);
  
  try {
    // Use the new movie service
    const recommendations = await movieService.generateRecommendations(preferences);
    
    if (recommendations.length > 0) {
      console.log("Generated recommendations:", recommendations);
      return recommendations;
    }
    
    // Fallback to curated database if API fails
    return getFallbackRecommendations(preferences);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return getFallbackRecommendations(preferences);
  }
};

// Fallback recommendations if APIs fail
const getFallbackRecommendations = (preferences: UserPreferences): MovieRecommendation[] => {
  const fallbackMovies: MovieRecommendation[] = [
    {
      id: "fallback-1",
      title: "The Shawshank Redemption",
      genre: "Drama",
      year: 1994,
      rating: 9.3,
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      poster: "",
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
    },
    {
      id: "fallback-2",
      title: "The Dark Knight",
      genre: "Action",
      year: 2008,
      rating: 9.0,
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
      poster: "",
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
    {
      id: "fallback-3",
      title: "Pulp Fiction",
      genre: "Crime",
      year: 1994,
      rating: 8.9,
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      poster: "",
      director: "Quentin Tarantino",
      cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
    },
    {
      id: "fallback-4",
      title: "Inception",
      genre: "Science Fiction",
      year: 2010,
      rating: 8.8,
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      poster: "",
      director: "Christopher Nolan",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
    },
    {
      id: "fallback-5",
      title: "The Godfather",
      genre: "Drama",
      year: 1972,
      rating: 9.2,
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      poster: "",
      director: "Francis Ford Coppola",
      cast: ["Marlon Brando", "Al Pacino", "James Caan"]
    },
    {
      id: "fallback-6",
      title: "Spirited Away",
      genre: "Animation",
      year: 2001,
      rating: 8.6,
      description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
      poster: "",
      director: "Hayao Miyazaki",
      cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"]
    },
    {
      id: "fallback-7",
      title: "Casablanca",
      genre: "Romance",
      year: 1942,
      rating: 8.5,
      description: "A cynical American expatriate struggles to decide whether or not he should help his former lover and her fugitive husband escape French Morocco.",
      poster: "",
      director: "Michael Curtiz",
      cast: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"]
    },
    {
      id: "fallback-8",
      title: "The Silence of the Lambs",
      genre: "Thriller",
      year: 1991,
      rating: 8.6,
      description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      poster: "",
      director: "Jonathan Demme",
      cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"]
    },
    {
      id: "fallback-9",
      title: "Goodfellas",
      genre: "Crime",
      year: 1990,
      rating: 8.7,
      description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
      poster: "",
      director: "Martin Scorsese",
      cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
    },
    {
      id: "fallback-10",
      title: "Schindler's List",
      genre: "Drama",
      year: 1993,
      rating: 8.9,
      description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.",
      poster: "",
      director: "Steven Spielberg",
      cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"]
    }
  ];

  // Filter by genre preference
  const genreMatches = fallbackMovies.filter(movie => 
    movie.genre.toLowerCase() === preferences.preferredGenre.toLowerCase()
  );

  // If we have genre matches, return them, otherwise return a mix
  if (genreMatches.length >= 5) {
    return genreMatches.slice(0, 10);
  } else {
    return [...genreMatches, ...fallbackMovies.filter(movie => 
      !genreMatches.includes(movie)
    )].slice(0, 10);
  }
};
