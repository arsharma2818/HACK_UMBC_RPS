import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';

// Import pages
import Home from './pages/home';
import Simulator from './pages/simulator';
import Learn from './pages/learn';
import About from './pages/about';
import Mod1 from './pages/rug-pulls';
import Mod2 from './pages/AMMs';
import Mod3 from './pages/pull-mechs';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
          <Route path="/rug-pulls" element={<Mod1 />} />
          <Route path="/AMMs" element={<Mod2 />} />
          <Route path="/pull-mechs" element={<Mod3 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
