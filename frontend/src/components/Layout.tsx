import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}