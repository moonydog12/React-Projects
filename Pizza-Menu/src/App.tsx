import { pizzaData } from './data'

interface IPizza {
  name: string
  ingredients: string
  price: number
  photoName: string
  soldOut: boolean
}

interface PizzaProps {
  pizzaObj: IPizza
  key: string
}

interface OrderProps {
  closeHour: number
  openHour: number
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}
function Header() {
  return (
    <header className="header">
      <h1 className="header">Fast React Pizza Co.</h1>
    </header>
  )
}

function Menu() {
  const pizzas = pizzaData
  const numPizzas = pizzas.length

  return (
    <main className="menu">
      <h2>Out menu</h2>

      {numPizzas > 0 ? (
        // React Fragments
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza: IPizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <div>We are still working on our menu</div>
      )}
    </main>
  )
}

function Pizza(props: PizzaProps) {
  // Destructuring  props
  const { pizzaObj } = props
  const { soldOut, photoName, name, ingredients, price } = pizzaObj

  return (
    <li className={`pizza ${soldOut ? 'sold-out' : ''}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        {/* Conditional render */}
        <span>{soldOut ? 'SOLD OUT' : price}</span>
      </div>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 8
  const closeHour = 21
  const isOpen = hour >= openHour && hour <= closeHour

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  )
}

function Order({ closeHour }: OrderProps) {
  return (
    <div className="order">
      <p>We're open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  )
}

export default App
