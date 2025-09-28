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
import Mod4 from './pages/red-flags';
import Mod5 from './pages/liq-locks';
import Mod6 from './pages/protection-strats';

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
          <Route path="/red-flags" element={<Mod4 />} />
          <Route path="/liq-locks" element={<Mod5 />} />
          <Route path="/protection-strats" element={<Mod6 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
