import { Link, Outlet } from 'react-router-dom';
import s from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <header className={s.layoutHeader}>
        <nav className={s.layoutHeader__nav}>
          <Link to="/products">Products</Link>
          <Link to="/create-product">Create Product</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
