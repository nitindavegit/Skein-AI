
import { UserPreferences, MovieRecommendation } from "@/pages/Index";

// This is a sophisticated recommendation engine that analyzes user preferences
// In a real application, this would connect to TMDB API and use AI for recommendations
export const generateMovieRecommendations = async (preferences: UserPreferences): Promise<MovieRecommendation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Curated movie database with detailed information
  const movieDatabase: MovieRecommendation[] = [
    {
      id: "1",
      title: "Blade Runner 2049",
      genre: "Science Fiction",
      year: 2017,
      rating: 8.0,
      description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.",
      poster: "/blade-runner-2049.jpg",
      director: "Denis Villeneuve",
      cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"]
    },
    {
      id: "2",
      title: "The Grand Budapest Hotel",
      genre: "Comedy",
      year: 2014,
      rating: 8.1,
      description: "The adventures of Gustave H, a legendary concierge at a famous European hotel, and his protégé Zero Moustafa.",
      poster: "/grand-budapest.jpg",
      director: "Wes Anderson",
      cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"]
    },
    {
      id: "3",
      title: "Mad Max: Fury Road",
      genre: "Action",
      year: 2015,
      rating: 8.1,
      description: "In a post-apocalyptic wasteland, Max teams up with a mysterious woman to escape a cult leader and his army.",
      poster: "/mad-max.jpg",
      director: "George Miller",
      cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"]
    },
    {
      id: "4",
      title: "Her",
      genre: "Romance",
      year: 2013,
      rating: 8.0,
      description: "A sensitive writer develops an unlikely relationship with an operating system designed to meet his every need.",
      poster: "/her.jpg",
      director: "Spike Jonze",
      cast: ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams"]
    },
    {
      id: "5",
      title: "Get Out",
      genre: "Horror",
      year: 2017,
      rating: 7.8,
      description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness becomes a nightmare.",
      poster: "/get-out.jpg",
      director: "Jordan Peele",
      cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"]
    },
    {
      id: "6",
      title: "Moonlight",
      genre: "Drama",
      year: 2016,
      rating: 7.4,
      description: "A chronicle of the childhood, adolescence and burgeoning adulthood of a young, African-American, gay man growing up in Miami.",
      poster: "/moonlight.jpg",
      director: "Barry Jenkins",
      cast: ["Mahershala Ali", "Naomie Harris", "Trevante Rhodes"]
    },
    {
      id: "7",
      title: "Spider-Man: Into the Spider-Verse",
      genre: "Animation",
      year: 2018,
      rating: 8.4,
      description: "Teen Miles Morales becomes Spider-Man and must save the city from Kingpin with the help of other Spider-People from parallel dimensions.",
      poster: "/spider-verse.jpg",
      director: "Bob Persichetti",
      cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"]
    },
    {
      id: "8",
      title: "Knives Out",
      genre: "Mystery",
      year: 2019,
      rating: 7.9,
      description: "A detective investigates the death of a patriarch of an eccentric, combative family.",
      poster: "/knives-out.jpg",
      director: "Rian Johnson",
      cast: ["Daniel Craig", "Chris Evans", "Ana de Armas"]
    },
    {
      id: "9",
      title: "1917",
      genre: "War",
      year: 2019,
      rating: 8.2,
      description: "Two British soldiers are tasked to deliver a message to call off a doomed attack during World War I.",
      poster: "/1917.jpg",
      director: "Sam Mendes",
      cast: ["George MacKay", "Dean-Charles Chapman", "Mark Strong"]
    },
    {
      id: "10",
      title: "The Shape of Water",
      genre: "Fantasy",
      year: 2017,
      rating: 7.3,
      description: "At a top secret research facility, a lonely janitor forms a unique relationship with an amphibious creature.",
      poster: "/shape-of-water.jpg",
      director: "Guillermo del Toro",
      cast: ["Sally Hawkins", "Octavia Spencer", "Michael Shannon"]
    },
    {
      id: "11",
      title: "John Wick",
      genre: "Action",
      year: 2014,
      rating: 7.4,
      description: "An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took his car.",
      poster: "/john-wick.jpg",
      director: "Chad Stahelski",
      cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"]
    },
    {
      id: "12",
      title: "Lady Bird",
      genre: "Comedy",
      year: 2017,
      rating: 7.4,
      description: "A high school senior navigates a loving but turbulent relationship with her strong-willed mother over her last year before college.",
      poster: "/lady-bird.jpg",
      director: "Greta Gerwig",
      cast: ["Saoirse Ronan", "Laurie Metcalf", "Tracy Letts"]
    },
    {
      id: "13",
      title: "Hereditary",
      genre: "Horror",
      year: 2018,
      rating: 7.3,
      description: "A grieving family is haunted by tragedy and disturbing secrets.",
      poster: "/hereditary.jpg",
      director: "Ari Aster",
      cast: ["Toni Collette", "Alex Wolff", "Milly Shapiro"]
    },
    {
      id: "14",
      title: "Call Me by Your Name",
      genre: "Romance",
      year: 2017,
      rating: 7.9,
      description: "In 1980s Italy, romance blossoms between a seventeen-year-old student and the older man hired as his father's research assistant.",
      poster: "/call-me-by-your-name.jpg",
      director: "Luca Guadagnino",
      cast: ["Timothée Chalamet", "Armie Hammer", "Michael Stuhlbarg"]
    },
    {
      id: "15",
      title: "Parasite",
      genre: "Thriller",
      year: 2019,
      rating: 8.5,
      description: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.",
      poster: "/parasite.jpg",
      director: "Bong Joon-ho",
      cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
    }
  ];

  // Smart filtering based on preferences
  let filteredMovies = movieDatabase.filter(movie => {
    const genreMatch = movie.genre.toLowerCase() === preferences.preferredGenre.toLowerCase();
    return genreMatch;
  });

  // If not enough movies in preferred genre, add similar movies
  if (filteredMovies.length < 10) {
    const additionalMovies = movieDatabase.filter(movie => 
      !filteredMovies.includes(movie) && 
      (movie.genre !== preferences.preferredGenre || Math.random() > 0.5)
    );
    filteredMovies = [...filteredMovies, ...additionalMovies];
  }

  // Mood-based scoring and sorting
  const scoredMovies = filteredMovies.map(movie => {
    let moodScore = 0;
    
    // Mood matching logic
    const mood = preferences.currentMood.toLowerCase();
    if (mood.includes('excited') || mood.includes('action')) {
      moodScore += movie.genre === 'Action' ? 2 : 0;
    }
    if (mood.includes('laugh') || mood.includes('light')) {
      moodScore += movie.genre === 'Comedy' ? 2 : 0;
    }
    if (mood.includes('romantic') || mood.includes('romance')) {
      moodScore += movie.genre === 'Romance' ? 2 : 0;
    }
    if (mood.includes('cry') || mood.includes('deep')) {
      moodScore += movie.genre === 'Drama' ? 2 : 0;
    }
    if (mood.includes('scared') || mood.includes('horror')) {
      moodScore += movie.genre === 'Horror' ? 2 : 0;
    }
    if (mood.includes('think') || mood.includes('mysterious')) {
      moodScore += ['Mystery', 'Thriller', 'Science Fiction'].includes(movie.genre) ? 2 : 0;
    }

    // Rating boost
    moodScore += movie.rating / 2;

    return { ...movie, moodScore };
  });

  // Sort by mood score and return top 10
  const recommendations = scoredMovies
    .sort((a, b) => b.moodScore - a.moodScore)
    .slice(0, 10);

  console.log("Generated recommendations for:", preferences);
  console.log("Recommendations:", recommendations);

  return recommendations;
};
