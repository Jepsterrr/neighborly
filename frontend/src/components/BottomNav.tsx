import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiPlusSquare, FiGrid } from 'react-icons/fi';

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end>
        <FiHome />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/create">
        <FiPlusSquare />
        <span>New Request</span>
      </NavLink>
      <NavLink to="/profile">
        <FiUser />
        <span>Profile</span>
      </NavLink>
      <div className="nav-item">
         <FiGrid />
         <span>More</span>
      </div>
    </nav>
  );
}