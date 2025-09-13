import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle'; // We'll create this

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
          <Link to="/">Prodexa</Link> 
      </div>
      
     


      <div className="nav-items">
        <ThemeToggle />
        <span>Welcome, {user?.name}</span>
      
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;