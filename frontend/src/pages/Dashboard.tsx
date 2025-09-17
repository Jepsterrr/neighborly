import { Link } from 'react-router-dom';
import { FiTool, FiMessageSquare, FiUser } from 'react-icons/fi';

export function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome! What would you like to do today?</p>
      </div>
      <div className="dashboard-grid">
        <Link to="/services" className="dashboard-card">
          <FiTool className="card-icon" />
          <h3>Service Exchange</h3>
          <p>Lend, borrow, or get help from neighbors.</p>
        </Link>
        <Link to="/posts" className="dashboard-card">
          <FiMessageSquare className="card-icon" />
          <h3>Community Posts</h3>
          <p>Ask questions or share info with the community.</p>
        </Link>
        <Link to="/profile" className="dashboard-card">
          <FiUser className="card-icon" />
          <h3>My Profile</h3>
          <p>View your reputation and edit your details.</p>
        </Link>
      </div>
    </div>
  );
}