// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-blue-200 transition">
            News Aggregator
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/preferences" className="hover:text-blue-200 transition">
            Preferences
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded bg-blue-700 hover:bg-blue-500"
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 py-4">
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/preferences" className="hover:text-blue-200 transition">
              Preferences
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};