import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import routes from '../routes.js';
import { setCredentials } from '../store/authSlice.js';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.login(), values);
        dispatch(setCredentials(response.data));
        navigate(routes.root());
      } catch (error) {
        setSubmitting(false);

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setAuthFailed(true);
          inputRef.current?.select();
          return;
        }

        throw error;
      }
    },
  });

  return (
    <Container fluid className="bg-light">
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4">
        <Card className="w-50 shadow-sm">
          <Card.Body className="p-5">
            <h1 className="text-center mb-4">Войти</h1>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Ваш ник</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Ваш ник"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Неверные имя пользователя или пароль
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={formik.isSubmitting}
              >
                Войти
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4 text-center">
            Нет аккаунта?
            {' '}
            <Link to={routes.signupPage()}>Регистрация</Link>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage;
