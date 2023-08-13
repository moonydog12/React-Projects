import Header from './Header'
import MainBody from './MainBody'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import ProgressBar from './ProgressBar'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Timer from './Timer'
import { useQuiz } from '../contexts/QuizContext'

function App() {
  const { status } = useQuiz()

  return (
    <div className="app">
      <Header />
      <MainBody>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <ProgressBar />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </MainBody>
    </div>
  )
}

export default App
