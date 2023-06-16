import { useState } from 'react'
import { Item } from './interface'
import ItemComp from './Item'

interface PackingListProps {
  items: Item[]
  onDeleteItem: (id: number) => void
  onToggleItem: (id: number) => void
  onClearList: () => void
}

function PackingList(props: PackingListProps) {
  const { items, onDeleteItem, onToggleItem, onClearList } = props
  const [sortBy, setSortBy] = useState('input')

  // Derived state
  let sortedItems: Item[]

  switch (sortBy) {
    case 'packed':
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed))
      break
    case 'description':
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description))
      break

    default:
      sortedItems = items
      break
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <ItemComp
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  )
}

export default PackingList
