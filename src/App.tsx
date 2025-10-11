import { useEffect, useState } from 'react';
// Router //
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Initiate, ReadingTest, WritingTest, ListeningTest, Results } from './pages';
// styles //
import { LoadingBlock, LoadingGif } from './styles';
// imgs //
import listeningImg from '/img/listening.png';
import readingImg from '/img/reading.png';
import writingImg from '/img/writing.png';
import speakingImg from '/img/speaking.png';
import trophyImg from '/img/trophy.png';
// Loader //
import Loader from '/img/loading.gif';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload all images //
    const imageSources = [listeningImg, readingImg, writingImg, speakingImg, trophyImg];
    // img loaded //
    let loadedImages = 0;
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages++;
        // Check if all images and font are loaded //
        if (loadedImages === imageSources.length) {
          setIsLoaded(true);
        }
      };
    });
  }, []);

  return (
    <>
      {!isLoaded ? (
        <LoadingBlock>
          <LoadingGif src={Loader} alt="Loading..." />
        </LoadingBlock>
      ) : (
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
      )}
    </>
  );
}

export default App;
