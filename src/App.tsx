import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './pages/ProductPage';
import { Layout } from './layout/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="products" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
