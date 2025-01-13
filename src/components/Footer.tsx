// src/components/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} News Aggregator. All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <span className="material-icons">twitter</span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <span className="material-icons">facebook</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <span className="material-icons">linkedin</span>
          </a>
        </div>
      </div>
    </footer>
  );
};