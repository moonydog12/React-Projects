import { tempMovieData, tempWatchedData } from './data'
import { Navbar, Logo, Search, NumResults } from './components/Navbar'
import Box from './components/Box'
import { MovieList } from './components/ListBox'
import { WatchedMoviesList, WatchedSummary } from './components/WatchedBox'
import { useState, ReactNode, useEffect } from 'react'

interface Props {
  children: ReactNode
}

const KEY = '165606b8'
const query = 'Dark Knight'

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)
  const [watched, setWatched] = useState(tempWatchedData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // code that will run at different moments:mount, re-render, unmount
  useEffect(
    () => {
      async function fetchData() {
        try {
          setIsLoading(true)
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
          if (!res.ok) throw new Error('Something went wrong with fetching movie')
          const data = await res.json()
          if (data.Response === 'False') throw new Error('Movie not found')
          setMovies(data.Search)
        } catch (error) {
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    },
    // dependency array
    []
  )

  return (
    <>
      {/* Component Composition */}
      <Navbar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedMoviesList watched={watched} />
          <WatchedSummary watched={watched} />
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

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  )
}
