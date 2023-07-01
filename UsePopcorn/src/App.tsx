import { tempMovieData, tempWatchedData } from './data';
import { Navbar, Logo, Search, NumResults } from './components/Navbar';
import Box from './components/Box';
import { MovieList } from './components/ListBox';
import { WatchedMoviesList, WatchedSummary } from './components/WatchedBox';
import Main from './components/Main';
import MovieDetails from './components/MovieDetails';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';
import { ImdbMovie, Movie } from './interfaces';

const API_KEY = '165606b8';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(tempMovieData);
  const [watched, setWatched] = useState<ImdbMovie[]>(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectMovie = (id: string) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie: ImdbMovie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Something went wrong with fetching movie');
        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');
        setMovies(data.Search);
        setError('');
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    handleCloseMovie();
    fetchData();

    // Clean up
    return () => {
      // Cancel the current request each time the new one comes in to prevent race condition
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}
