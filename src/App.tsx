// Router //
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Initiate, ReadingTest } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/initiate" element={<Initiate />} />
          <Route path="/reading-test" element={<ReadingTest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
