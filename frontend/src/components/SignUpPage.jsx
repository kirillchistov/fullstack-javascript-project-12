import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import routes from '../routes.js';
import { setCredentials } from '../store/authSlice.js';
import { signupSchema } from '../utils/signupValidation.js';

const SignUpPage = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(routes.signup(), {
        username: values.username.trim(),
        password: values.password,
      });
      dispatch(setCredentials(response.data));
      navigate(routes.root());
    } catch (error) {
      setSubmitting(false);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrors({ username: 'Такой пользователь уже существует' });
        inputRef.current?.select();
        return;
      }

      throw error;
    }
  };

  return (
    <Container fluid className="bg-light">
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4">
        <Card className="w-50 shadow-sm">
          <Card.Body className="p-5">
            <h1 className="text-center mb-4">Регистрация</h1>
            <Formik
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleSubmit: submitForm,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form noValidate onSubmit={submitForm}>
                  <Form.Group className="mb-3" controlId="signupUsername">
                    <Form.Label>Ваш ник</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Ваш ник"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={Boolean(touched.username && errors.username)}
                      ref={inputRef}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="signupPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={Boolean(touched.password && errors.password)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="signupConfirmPassword">
                    <Form.Label>Подтверждение пароля</Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder="Подтверждение пароля"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    Зарегистрироваться
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <Card.Footer className="p-4 text-center">
            Уже есть аккаунт?
            {' '}
            <Link to={routes.loginPage()}>Войти</Link>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default SignUpPage;
