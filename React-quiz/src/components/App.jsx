import { useEffect, useReducer } from 'react'
import Header from './Header'
import MainBody from './MainBody'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'

// useReducer way to track states
const initialState = {
  questions: [],

  // record the current displayed question
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
}

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

    default:
      throw new Error('Action unknown')
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  )
  const numQuestions = questions.length

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
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </MainBody>
    </div>
  )
}

export default App
