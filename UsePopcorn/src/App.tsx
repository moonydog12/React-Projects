import { tempMovieData, tempWatchedData } from './data'
import { Navbar, Logo, Search, NumResults } from './components/Navbar'
import { ListBox, MovieList } from './components/ListBox'
import WatchedBox from './components/WatchedBox'
import { useState, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)

  return (
    <>
      {/* Component Composition */}
      <Navbar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox tempWatchedData={tempMovieData}></WatchedBox>
      </Main>
    </>
  )
}

function Main({ children }: Props) {
  return <main className="main">{children}</main>
}
