import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const buttonStyle = {
  backgroundColor: '#7950f2',
  color: '#fff',
}

interface Styles {
  backgroundColor: string
  color: string
}

function App() {
  return (
    <div>
      {/* <Counter /> */}
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

          <StepMessage step={step}>
            <span>{messages[step - 1]}</span>
          </StepMessage>

          <div className="buttons">
            <Button styles={buttonStyle} onClick={handlePrevious}>
              <span>⬅️ Previous</span>
            </Button>

            <Button styles={buttonStyle} onClick={handleNext}>
              <span>➡️ Next</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function StepMessage({
  step,
  children,
}: {
  step: number
  children: JSX.Element
}) {
  return (
    <div className="message">
      <h3>Step {step}:</h3>
      {children}
    </div>
  )
}

function Button({
  styles,
  onClick,
  children,
}: {
  styles: Styles
  onClick: () => void
  children: JSX.Element
}) {
  const { backgroundColor, color } = styles
  return (
    <button onClick={onClick} style={{ color, backgroundColor }}>
      {children}
    </button>
  )
}

export default App
