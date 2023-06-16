import { Item } from './interface'
import { useState, FormEvent } from 'react'

interface FormProps {
  onAddItem: (newItem: Item) => void
}

function Form({ onAddItem }: FormProps) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(5)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!description) return

    const newItem: Item = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    }

    onAddItem(newItem)
    setDescription('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(event) => {
          setQuantity(Number(event.target.value))
        }}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        onChange={(event) => setDescription(event.target.value)}
        type="text"
        placeholder="Item..."
        value={description}
      />
      <button>Add</button>
    </form>
  )
}

export default Form
