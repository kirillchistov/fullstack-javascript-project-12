import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route
        path={routes.root()}
        element={(
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        )}
      />
      <Route path={routes.loginPage()} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
