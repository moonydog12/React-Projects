export interface Movie {
  imdbID: string;
  Title?: string;
  Year?: string;
  Poster?: string;
}

export interface Movies {
  movies: Movie[];
}

export interface WatchedMovie extends Movie {
  title: string;
  poster: string;
  year: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface WatchedMovies {
  watched: WatchedMovie[];
}

export interface ImdbMovie extends Movie {
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}
