import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>

        {/* catching route */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
