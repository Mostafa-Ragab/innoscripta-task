import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Preferences from './Preferences';

export const Navbar: React.FC = () => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false); // Toggle state for Preferences sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Toggle state for mobile menu
  const location = useLocation(); // Get the current location

  // Helper to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            <Link to="/" className="hover:text-red-600 transition">
              News Aggregator
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`hover:text-red-600 transition ${
                isActive('/') ? 'text-red-600 font-semibold' : 'text-gray-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/news-feed"
              className={`hover:text-red-600 transition ${
                isActive('/news-feed') ? 'text-red-600 font-semibold' : 'text-gray-800'
              }`}
            >
              News Feed
            </Link>
            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Preferences
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
            >
              <span className="material-icons">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <div
          className={`fixed inset-0 bg-white text-gray-800 flex flex-col items-center justify-center space-y-6 transform transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <Link
            to="/"
            className={`text-lg font-semibold hover:text-red-600 transition ${
              isActive('/') ? 'text-red-600' : 'text-gray-800'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/news-feed"
            className={`text-lg font-semibold hover:text-red-600 transition ${
              isActive('/news-feed') ? 'text-red-600' : 'text-gray-800'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            News Feed
          </Link>
          <button
            onClick={() => {
              setIsPreferencesOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Preferences
          </button>
        </div>
      </nav>

      {/* Preferences Sidebar */}
      <Preferences
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </>
  );
};