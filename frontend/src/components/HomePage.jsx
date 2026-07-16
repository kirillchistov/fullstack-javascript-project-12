import { Link } from 'react-router-dom';
import routes from '../routes.js';

const HomePage = () => (
  <main className="page">
    <h1>Hexlet Chat</h1>
    <p>
      <Link to={routes.loginPage()}>Войти</Link>
    </p>
  </main>
);

export default HomePage;
