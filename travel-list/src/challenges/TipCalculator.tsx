import { useState } from 'react'

interface BillInputProps {
  bill: number
  onSetBill: (bill: number) => void
}

interface SelectPercentage {
  percentage: number
  onSelect: (percentage: number) => void
  children: JSX.Element
}

function TipCalculator() {
  const [bill, setBill] = useState(0)
  const [percentage1, setPercentage1] = useState(0)
  const [percentage2, setPercentage2] = useState(0)
  const tip = bill * ((percentage1 + percentage2) / 2 / 100)

  const handleReset = () => {
    setBill(0)
    setPercentage1(0)
    setPercentage2(0)
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        <span>How did you like the service</span>
      </SelectPercentage>

      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        <span>How did your friend like the service</span>
      </SelectPercentage>

      {bill > 0 ? (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      ) : null}
    </div>
  )
}

function BillInput({ bill, onSetBill }: BillInputProps) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => {
          onSetBill(Number(e.target.value))
        }}
      />
    </div>
  )
}

function SelectPercentage({
  percentage,
  onSelect,
  children,
}: SelectPercentage) {
  return (
    <div>
      <label>{children}</label>
      <select value={percentage} onChange={(e) => onSelect(+e.target.value)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">OK (5%)</option>
        <option value="10">Good (10%)</option>
        <option value="20">Amazing (20%)</option>
      </select>
    </div>
  )
}

function Output({ bill, tip }: { bill: number; tip: number }) {
  return (
    <h3>
      You pay {bill + tip} (${bill}+${tip}tip)
    </h3>
  )
}

function Reset({ onReset }: { onReset: () => void }) {
  return <button onClick={onReset}>Reset</button>
}

export default TipCalculator
