import { Link, Outlet, useLocation } from 'react-router-dom';
import s from './Layout.module.scss';

export const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <header className={s.layoutHeader}>
        <p>React test task</p>
        <nav className={s.layoutHeader__nav}>
          {path !== '/create-product' && (
            <Link to="/create-product">Create Product</Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
