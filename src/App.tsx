// Router //
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Initiate, ReadingTest, WritingTest, ListeningTest } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/initiate" element={<Initiate />} />
          <Route path="/reading-test" element={<ReadingTest />} />
          <Route path="/writing-test" element={<WritingTest />} />
          <Route path="/listening-test" element={<ListeningTest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
