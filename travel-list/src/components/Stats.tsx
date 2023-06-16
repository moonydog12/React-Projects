import { Item } from './interface'

interface StatProps {
  items: Item[]
}

function Stats({ items }: StatProps) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    )
  }

  // Derived state(Will also be re-rendered)
  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const percentage = Math.round((numPacked / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'READY!'
          : `You have ${numItems} items on your list, and you already packed ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  )
}

export default Stats
