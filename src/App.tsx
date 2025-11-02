import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './pages/ProductPage';
import { CardPage } from './pages/CardPage';
import CreateProductPage from './pages/CreateProductPage';
import { Layout } from './layout/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:id" element={<CardPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
