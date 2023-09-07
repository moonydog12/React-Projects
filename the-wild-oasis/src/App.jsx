import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Booking from './pages/Bookings'
import Cabins from './pages/Cabins'
import Users from './pages/Users'
import Setting from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import GlobalStyles from './styles/GlobalStyles'
import AppLayout from './ui/AppLayout'

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to={'dashboard'} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="booking" element={<Booking />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="setting" element={<Setting />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />

          {/* Catching route */}
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
