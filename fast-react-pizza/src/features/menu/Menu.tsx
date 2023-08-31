import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../ui/services/apiRestaurant'
import MenuItem from './MenuItem'

type Pizza = {
  id: number
  name: string
  unitPrice: number
  imageUrl: string
  ingredients: string[]
  soldOut: boolean
}

// Loader function
export async function loader() {
  const menu = await getMenu()

  return menu
}

function Menu() {
  const menu = useLoaderData() as Pizza[]

  return (
    <ul className="divide-y divide-stone-400 px-2">
      {menu.map((pizza: Pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  )
}

export default Menu
