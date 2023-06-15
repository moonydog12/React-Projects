import { FormEvent, useState } from 'react'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: true },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
]

interface Iitem {
  id: number
  description: string
  quantity: number
  packed: boolean
}

function App() {
  return (
    <main className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </main>
  )
}

function Logo() {
  return <h1>🌴 Far Away </h1>
}

function Form() {
  // Controlled element (keep state in sync with form element)
  // 1.Define piece of states
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(5)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!description) return

    const newItem: Iitem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    }
    setDescription('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      {/* 2. Binding the state and the input value*/}
      <select
        value={quantity}
        onChange={(event) => {
          // 3. Update the state
          setQuantity(Number(event.target.value))
        }}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* Controlled element No.2 */}
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }: { item: Iitem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list,and you already packed X</em>
    </footer>
  )
}

export default App
