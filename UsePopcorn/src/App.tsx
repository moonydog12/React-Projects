import { tempMovieData, tempWatchedData } from './data'
import { Navbar, Logo, Search, NumResults } from './components/Navbar'
import Box from './components/Box'
import { MovieList } from './components/ListBox'
import { WatchedMoviesList, WatchedSummary } from './components/WatchedBox'
import { useState, ReactNode, useEffect } from 'react'
import StarRating from './components/StarRating'

interface Props {
  children: ReactNode
}

const KEY = '165606b8'

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)
  const [watched, setWatched] = useState(tempWatchedData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('parasite')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  // code that will run at different moments:mount, re-render, unmount
  useEffect(
    () => {
      async function fetchData() {
        try {
          setIsLoading(true)
          setError('')
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
          if (!res.ok) throw new Error('Something went wrong with fetching movie')
          const data = await res.json()
          if (data.Response === 'False') throw new Error('Movie not found')
          setMovies(data.Search)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }

      if (query.length < 3) {
        setMovies([])
        setError('')
        return
      }

      fetchData()
    },
    // dependency array
    [query]
  )

  return (
    <>
      {/* Component Composition */}
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
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />
          ) : (
            <>
              <WatchedMoviesList watched={watched} />
              <WatchedSummary watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

function Main({ children }: Props) {
  return <main className="main">{children}</main>
}

function Loader() {
  return <p className="loader">Loading</p>
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  )
}

function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
  } = movie

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  }, [selectedId])

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
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
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
