import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { QuizProvider } from './contexts/QuizContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
)
