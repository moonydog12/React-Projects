import Header from './Header';
import Spinner from './Spinner';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';

function AppLayout() {
  // react router hook that provides status indicator
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="layout">
      {isLoading && <Spinner />}
      <Header />
      <main>
        {/* Outlet component render current nested route */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
