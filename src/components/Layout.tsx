import React from 'react';
import { Filters } from './Filters';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Pagination } from './Pagination';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Filters />
        <main className="flex-grow">{children}</main>
         {/* Pagination Section */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <Pagination />
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;