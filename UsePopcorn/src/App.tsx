import { tempMovieData, tempWatchedData } from './data'
import { Navbar, Logo, Search, NumResults } from './components/Navbar'
import Box from './components/Box'
import { MovieList } from './components/ListBox'
import { WatchedMoviesList, WatchedSummary } from './components/WatchedBox'
import { useState, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)
  const [watched, setWatched] = useState(tempWatchedData)

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
          <MovieList movies={movies} />
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
