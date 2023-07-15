import { useEffect, useReducer } from 'react'
import Header from './Header'
import MainBody from './MainBody'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'

const initialState = {
  questions: [],

  // loading,error,ready,active,finished
  status: 'loading',
}

function reducer(state, action) {
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

    default:
      throw new Error('Action unknown')
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) => {
        // dispatching
        dispatch({ type: 'dataReceived', payload: data })
      })
      .catch((error) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className="app">
      <Header />
      <MainBody>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
      </MainBody>
    </div>
  )
}

export default App
