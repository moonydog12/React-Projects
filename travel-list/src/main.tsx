import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
// import FlashCard from './challenges/FlashCard.tsx'
// import Counter from './challenges/Counter.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <FlashCard /> */}
    {/* <Counter /> */}
  </React.StrictMode>
)
