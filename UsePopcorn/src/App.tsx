import { tempMovieData, tempWatchedData } from './data'
import Navbar from './components/Navbar'
import ListBox from './components/Listbox'
import WatchedBox from './components/WatchedBox'

export default function App() {
  return (
    <>
      <Navbar movies={tempMovieData} />
      <Main />
    </>
  )
}

function Main() {
  return (
    <main className="main">
      <ListBox tempMovieData={tempMovieData} />
      <WatchedBox tempWatchedData={tempWatchedData} />
    </main>
  )
}
