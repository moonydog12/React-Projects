import { useState } from 'react'
import './accordion.css'
import { faqs } from './data'

interface Question {
  title: string
  text: string
}

interface AccordionProps {
  data: Question[]
}

interface AccordionItemProps {
  title: string
  num: number
  curOpen: number
  children: JSX.Element
  onOpen: (num: number) => void
}

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  )
}

function Accordion({ data }: AccordionProps) {
  const [curOpen, setCurOpen] = useState(-1)

  return (
    <div className="accordion">
      {data.map((el, index) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={index}
          key={index}
        >
          <p>{el.text}</p>
        </AccordionItem>
      ))}

      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        title="test"
        num={12}
        key={12}
      >
        <>
          <p>Allows React developers to:</p>
          <ul>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </>
      </AccordionItem>
    </div>
  )
}

function AccordionItem(props: AccordionItemProps) {
  const { curOpen, num, title, onOpen, children } = props
  const isOpen = num === curOpen

  return (
    <div
      className={`item ${isOpen ? 'open' : null}`}
      onClick={() => onOpen(isOpen ? NaN : num)}
    >
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  )
}
