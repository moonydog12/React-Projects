import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './ui/Home'
import Error from './ui/ErrorFC'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder, { action as createOrderAction } from './features/order/CreateOrder'
import { loader as orderLoader } from './features/order/Order'
import Order from './features/order/Order'
import AppLayout from './ui/AppLayout'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    // define child route(routes defined here become nested route of AppLayout)
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      { path: '/order/new', element: <CreateOrder />, action: createOrderAction },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router}></RouterProvider>
}
