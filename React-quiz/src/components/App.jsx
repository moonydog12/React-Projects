import { useEffect, useReducer } from 'react'

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

// useReducer way to track states
const initialState = {
  questions: [],

  // record the current displayed question
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
}

const SECS_PER_QUESTION = 30

function reducer(state, action) {
  const question = state.questions.at(state.index)

  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }

    case 'newAnswer':
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }

    // Moving to next question
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      }

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,

        // check timer and stop the game
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }

    default:
      throw new Error('Action unknown')
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

  // derived states
  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) => {
        // dispatching
        dispatch({ type: 'dataReceived', payload: data })
      })
      .catch(() => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className="app">
      <Header />
      <MainBody>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </MainBody>
    </div>
  )
}

export default App
