import { useLocation } from 'react-router-dom';

const SubPage = () => {
  const location = useLocation();
  const selectedItem = location.state?.selectedItem;

  return (
    <div>
      {selectedItem && (
        <div>
          <h2>Selected Exam:</h2>
          <p>Type: {selectedItem.type}</p>
          <p>Sub Type: {selectedItem.subType}</p>
          <p>
            Score: {selectedItem.currentScore} / {selectedItem.topScore}
          </p>
          <img src={selectedItem.img} alt={selectedItem.type} />
        </div>
      )}
    </div>
  );
};

export default SubPage;
