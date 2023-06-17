import { FormEvent, useState } from 'react'
import initialFriends from './data'

interface Friend {
  id: string
  name: string
  image: string
  balance: number
}

interface FriendListProps {
  friends: Friend[]
  onSelection: (friend: Friend) => void
  selectedFriend: Friend | null
}

interface FormAddFriendProps {
  onAddFriend: (friend: Friend) => void
}

interface ButtonProps {
  children: string
  onClick?: () => void
}

interface FriendCardProps {
  friend: Friend
  onSelection: (friend: Friend) => void
  selectedFriend: Friend | null
}

interface FormSplitBillProps {
  selectedFriend: Friend
  onSplitBill: (value: number) => void
}

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState<Friend[]>(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)

  const handleShowAddFriend = () => {
    setShowAddFriend(!showAddFriend)
  }

  const handleAddFriend = (friend: Friend) => {
    setFriends([...friends, friend])
    setShowAddFriend(false)
  }

  const handleSelection = (friend: Friend) => {
    setSelectedFriend((curSelected: Friend | null) =>
      curSelected?.id === friend.id ? null : { ...friend }
    )
    setShowAddFriend(false)
  }

  const handleSplitBill = (value: number) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )

    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function FriendsList({
  friends,
  onSelection,
  selectedFriend,
}: FriendListProps) {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendCard
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  )
}

function FriendCard({ friend, onSelection, selectedFriend }: FriendCardProps) {
  const isSelected = selectedFriend?.id === friend.id

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and your {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }: FormAddFriendProps) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const invalidInput = !name || !image
    if (invalidInput) return

    const id = crypto.randomUUID()

    const newFriend: Friend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    }

    onAddFriend(newFriend)

    setName('')
    setImage('https://i.pravatar.cc/48')
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({ selectedFriend, onSplitBill }: FormSplitBillProps) {
  const { name } = selectedFriend
  const [bill, setBill] = useState(0)
  const [paidByUser, setPaidByUser] = useState(0)
  const [whoIsPaying, setWhoIsPaying] = useState<'user' | 'friend'>('user')
  const paidByFriend = bill ? bill - paidByUser : 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!bill || !paidByUser) return
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>

      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>💵Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />

      <label>💶{name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>❔Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value as 'user' | 'friend')}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  )
}

export default App
