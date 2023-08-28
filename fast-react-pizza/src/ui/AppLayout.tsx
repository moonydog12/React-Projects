import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        {/* Outlet component render current nested route */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  )
}

export default AppLayout
