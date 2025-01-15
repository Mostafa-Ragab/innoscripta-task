
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import NewsFeed from './pages/NewsFeed';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news-feed" element={<NewsFeed />} />
      
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;