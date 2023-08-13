import { createContext, useEffect, useReducer, useContext } from 'react'

const QuizContext = createContext()

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

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

  // derived states
  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  // fetch data on mounted
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('QuizContext was used outside of the QuizProvider')
  }
  return context
}

export { QuizProvider, useQuiz }
