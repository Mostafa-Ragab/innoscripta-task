import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Preferences } from './pages/Preferences';


function App() {
  return (
   
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/preferences" element={<Preferences />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
   
  );
}

export default App;