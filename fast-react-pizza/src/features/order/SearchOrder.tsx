import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchOrder() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(event: React.ChangeEvent) => {
          const target = event.target as HTMLInputElement
          setQuery(target.value)
        }}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-700 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  )
}

export default SearchOrder
