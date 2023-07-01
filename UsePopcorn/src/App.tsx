import { Navbar, Logo, Search, NumResults } from './components/Navbar';
import Box from './components/Box';
import { MovieList } from './components/ListBox';
import { WatchedMoviesList, WatchedSummary } from './components/WatchedBox';
import Main from './components/Main';
import MovieDetails from './components/MovieDetails';
import Loader from './components/Loader';
import { useState } from 'react';
import { ImdbMovie } from './interfaces';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

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

  // Custom hook:useMovies
  const { movies, isLoading, error } = useMovies(query);

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
