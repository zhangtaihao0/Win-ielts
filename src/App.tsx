// Router //
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Initiate, ReadingTest, WritingTest, ListeningTest, Results } from './pages';

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
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
