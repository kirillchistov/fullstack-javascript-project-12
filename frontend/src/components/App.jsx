import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Layout from './Layout.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import SignUpPage from './SignUpPage.jsx';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<Layout />}>
        <Route
          path={routes.root()}
          element={(
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signupPage()} element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
