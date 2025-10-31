import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './pages/ProductPage';
import { Layout } from './layout/Layout';
import { CardPage } from './pages/CardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:id" element={<CardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
