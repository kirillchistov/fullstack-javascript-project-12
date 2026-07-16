import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <main className="page">
      <h1>404</h1>
      <p>{t('notFoundPage.title')}</p>
      <p>
        <Link to={routes.root()}>{t('notFoundPage.link')}</Link>
      </p>
    </main>
  );
};

export default NotFoundPage;
