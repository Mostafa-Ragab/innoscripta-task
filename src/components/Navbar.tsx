// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <Link to="/">News Aggregator</Link>
          </h1>

          {/* Hamburger Menu Button (Visible on Mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-gray-300 transition"
            >
              Home
            </Link>
            <Link
              to="/preferences"
              className="hover:text-gray-300 transition"
            >
              Preferences
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white shadow-lg border-t">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/"
                className="hover:text-gray-300 transition"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/preferences"
                className="hover:text-gray-300 transition"
                onClick={toggleMenu}
              >
                Preferences
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};