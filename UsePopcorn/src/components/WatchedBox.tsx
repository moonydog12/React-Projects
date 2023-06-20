import { WatchedMovie } from '../interfaces'

interface Props {
  watched: WatchedMovie[]
}

function WatchedSummary({ watched }: Props) {
  const average = (arr: number[]) => {
    return arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0)
  }

  // derived states
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.runtime))

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMoviesList({ watched }: Props) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  )
}

function WatchedMovieItem({ movie }: { movie: WatchedMovie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}

export { WatchedSummary, WatchedMoviesList, WatchedMovieItem }
