import { useSelector } from 'react-redux';
import { getCurrentUser } from '../store/authSlice.js';

const HomePage = () => {
  const username = useSelector(getCurrentUser);

  return (
    <main className="page">
      <h1>Hexlet Chat</h1>
      <p>Добро пожаловать, {username}!</p>
      <p>Здесь скоро будет чат.</p>
    </main>
  );
};

export default HomePage;
