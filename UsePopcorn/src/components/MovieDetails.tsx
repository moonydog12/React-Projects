import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import { ImdbMovie, WatchedMovie } from '../interfaces';

const API_KEY = '165606b8';

interface MovieDetailsProps {
  selectedId: string;
  onAddWatched: (watched: ImdbMovie) => void;
  onCloseMovie: () => void;
  watched: WatchedMovie[];
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }: MovieDetailsProps) {
  const [movie, setMovie] = useState<ImdbMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState<number>(NaN);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {};

  const handleAdd = () => {
    const newWatchedMovie: WatchedMovie = {
      imdbID: selectedId,
      title: title || '',
      year: year || '',
      poster: poster || '',
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(' ')[0]),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onCloseMovie();
        console.log('closing');
      }
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = title;

    // clean up function
    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>✨</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating maxRating={10} size={24} onSetRating={setUserRating} />

              {userRating && userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You have rated this movie {watchedUserRating} <span>✨</span>
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

export default MovieDetails;
