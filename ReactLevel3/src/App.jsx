import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Level3_2 } from './pages/Level3_2';
import { Level3_3 } from './pages/Level3_3';
import { Level3_4 } from './pages/Level3_4';
import { Level3_5 } from './pages/Level3_5';
import { MiniProject } from './pages/MiniProject';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level3.2" element={<Level3_2 />} />
      <Route path="/level3.3" element={<Level3_3 />} />
      <Route path="/level3.4" element={<Level3_4 />} />
      <Route path="/level3.5" element={<Level3_5 />} />
      <Route path="/mini-project" element={<MiniProject />} />
    </Routes>
  );
}

export default App
