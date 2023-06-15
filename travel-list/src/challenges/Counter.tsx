import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const date = new Date()

  date.setDate(date.getDate() + count)

  const handleReset = () => {
    setCount(0)
    setStep(1)
  }

  return (
    <>
      {/* Step */}
      <div>
        <button onClick={() => setStep((step) => step - 1)}>-</button>
        <span>Step:{step}</span>
        <button onClick={() => setStep((step) => step + 1)}>+</button>
      </div>

      {/* Range */}
      <input
        type="range"
        min="0"
        max="10"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <span>{step}</span>

      {/* Count */}
      <div>
        <button onClick={() => setCount((currentCount) => currentCount - step)}>
          -
        </button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((currentCount) => currentCount + step)}>
          +
        </button>
      </div>

      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      {count !== 0 || step !== 1 ? (
        <button onClick={handleReset}>Reset</button>
      ) : null}
    </>
  )
}

export default Counter
