import { ReactNode } from 'react'
import { ImdbMovie } from '../interfaces/index'

interface Props {
  children: ReactNode
}

interface SearchProps {
  query: string
  setQuery: (query: string) => void
}

function Navbar({ children }: Props) {
  return <nav className="nav-bar">{children}</nav>
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }: SearchProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function NumResults({ movies }: { movies: ImdbMovie[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

export { Navbar, Logo, Search, NumResults }
