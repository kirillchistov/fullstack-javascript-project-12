import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { getCurrentUser, removeCredentials } from '../store/authSlice.js';
import routes from '../routes.js';

const Layout = () => {
  const { t } = useTranslation();
  const username = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeCredentials());
    navigate(routes.loginPage());
  };

  return (
    <>
      <Navbar bg="white" expand="sm" className="border-bottom shadow-sm">
        <Container fluid>
          <Navbar.Brand as={Link} to={routes.root()}>
            {t('app.name')}
          </Navbar.Brand>
          {username && (
            <Button variant="outline-primary" className="ms-auto" onClick={handleLogout}>
              {t('buttons.exit')}
            </Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
