import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-blue-200 transition">
            News Aggregator
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/preferences" className="hover:text-blue-200 transition">
            Preferences
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="p-2 rounded bg-blue-700 hover:bg-blue-500 transition">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};