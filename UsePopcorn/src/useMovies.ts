import { useState, useEffect } from 'react';
import { Movie } from './interfaces';
import { tempMovieData } from './data';

const API_KEY = '165606b8';

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>(tempMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

    fetchData();

    // Clean up
    return () => {
      // Cancel the current request each time the new one comes in to prevent race condition
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
