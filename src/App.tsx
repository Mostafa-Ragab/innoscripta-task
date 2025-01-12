import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Preferences } from './pages/Preferences';

const App: React.FC = () => (
  <NewsProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
      
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
        </main>

     
        <Footer />
      </div>
    </Router>
  </NewsProvider>
);

export default App;