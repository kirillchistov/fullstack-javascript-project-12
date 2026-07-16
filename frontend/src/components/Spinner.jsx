import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('spinner.title')}</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
