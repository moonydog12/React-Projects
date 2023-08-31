import Header from './Header'
import Spinner from './Spinner'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'

function AppLayout() {
  // react router hook that provides status indicator
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Spinner />}
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* Outlet component render current nested route */}
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  )
}

export default AppLayout
