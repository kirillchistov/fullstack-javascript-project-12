import { Link } from 'react-router-dom';
import routes from '../routes.js';

const NotFoundPage = () => (
  <main className="page">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <p>
      <Link to={routes.root()}>На главную</Link>
    </p>
  </main>
);

export default NotFoundPage;
