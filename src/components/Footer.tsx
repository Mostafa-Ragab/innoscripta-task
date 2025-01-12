// src/components/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white text-center py-4">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} News Aggregator. All rights reserved.
    </p>
  </footer>
);