// Router //
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Initiate } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/initiate" element={<Initiate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
