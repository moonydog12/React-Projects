import { useState } from 'react'
import Logo from './Logo'
import Form from './Form'
import Stats from './Stats'
import PackingList from './PackingList'
import { Item } from './interface'

function App() {
  // Lifting up state
  const [items, setItems] = useState<Item[]>([])

  const handleAddItem = (item: Item) => {
    setItems([...items, item])
  }

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleToggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  const handleClearList = () => {
    setItems([])
  }

  return (
    <main className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </main>
  )
}

export default App
