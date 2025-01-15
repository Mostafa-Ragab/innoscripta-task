import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
        {/* Logo and Copyright */}
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-white mb-2">News Aggregator</h2>
          <p className="text-sm">&copy; {new Date().getFullYear()} News Aggregator. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-sm mb-6 lg:mb-0">
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <a href="/news-feed" className="hover:text-white transition">
            News Feed
          </a>
          <a href="/about" className="hover:text-white transition">
            About Us
          </a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 text-lg">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};