import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentToken } from '../store/authSlice.js';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const token = useSelector(getCurrentToken);
  const location = useLocation();

  return token
    ? children
    : <Navigate to={routes.loginPage()} state={{ from: location }} replace />;
};

export default PrivateRoute;
