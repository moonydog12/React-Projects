export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface Movies {
  movies: Movie[]
}

export interface WatchedMovie extends Movie {
  runtime: number
  imdbRating: number
  userRating: number
}

export interface WatchedMovies {
  watched: WatchedMovie[]
}
