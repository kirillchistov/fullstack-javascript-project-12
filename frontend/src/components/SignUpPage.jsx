import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import routes from '../routes.js';
import { setCredentials } from '../store/authSlice.js';
import { createSignupSchema } from '../utils/signupValidation.js';

const SignUpPage = () => {
  const { t } = useTranslation();
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
        setErrors({ username: t('errors.userExists') });
        inputRef.current?.select();
        return;
      }

      toast.error(t('toast.errorNetwork'));
      throw error;
    }
  };

  return (
    <Container fluid className="bg-light">
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4">
        <Card className="w-50 shadow-sm">
          <Card.Body className="p-5">
            <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
            <Formik
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={createSignupSchema(t)}
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
                    <Form.Label>{t('signUpPage.form.username')}</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder={t('signUpPage.form.username')}
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
                    <Form.Label>{t('signUpPage.form.password')}</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('signUpPage.form.password')}
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
                    <Form.Label>{t('signUpPage.form.confirmPassword')}</Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder={t('signUpPage.form.confirmPassword')}
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
                    {t('buttons.register')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <Card.Footer className="p-4 text-center">
            {t('signUpPage.footer.sentence')}
            {' '}
            <Link to={routes.loginPage()}>{t('signUpPage.footer.link')}</Link>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default SignUpPage;
