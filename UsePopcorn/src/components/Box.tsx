import { useState, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function Box({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  )
}

export default Box
