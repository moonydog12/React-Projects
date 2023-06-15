import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import FlashCard from './challenges/FlashCard.tsx'
import Counter from './challenges/Counter.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <FlashCard /> */}
    <Counter />
  </React.StrictMode>
)
