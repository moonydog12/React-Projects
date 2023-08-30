import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../ui/services/apiRestaurant';
import MenuItem from './MenuItem';

type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

// Loader function
export async function loader() {
  const menu = await getMenu();

  return menu;
}

function Menu() {
  const menu = useLoaderData() as Pizza[];

  return (
    <ul>
      {menu.map((pizza: Pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
