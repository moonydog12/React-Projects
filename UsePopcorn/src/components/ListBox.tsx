import { Movie, Movies } from '../interfaces';

interface MovieListProps extends Movies {
  onSelectMovie: (id: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

interface MovieItemProps {
  movie: Movie;
  onSelectMovie: (id: string) => void;
}

function MovieItem({ movie, onSelectMovie }: MovieItemProps) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export { MovieList, MovieItem };
