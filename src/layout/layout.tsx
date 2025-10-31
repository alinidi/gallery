import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/products">Products</Link>
          <Link to="/create-product">Create Product</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
