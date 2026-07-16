import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
