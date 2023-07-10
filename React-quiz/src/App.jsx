import { useEffect, useReducer } from 'react'
import Header from './Header'
import MainBody from './MainBody'

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
  const [state, dispatch] = useReducer(reducer, initialState)

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
        <p>1/15</p>
        <p>Question?</p>
      </MainBody>
    </div>
  )
}

export default App