import { useState } from 'react'
import Counter from './Counter'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const buttonStyle = {
  backgroundColor: '#7950f2',
  color: '#fff',
}

function App() {
  return (
    <div>
      <Counter />
      <Steps />
    </div>
  )
}

function Steps() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  const handlePrevious = () => {
    if (step < 2) return

    // Updating state based on current state
    setStep((step) => step - 1)
  }

  const handleNext = () => {
    if (step > 2) return
    setStep((step) => step + 1)
  }

  return (
    <>
      <button
        className="close"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen)
        }}
      >
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <p className="message">
            Step {step}:{messages[step - 1]}
          </p>
          <div className="buttons">
            <button style={buttonStyle} onClick={handlePrevious}>
              Previous
            </button>
            <button style={buttonStyle} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
