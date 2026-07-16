import { Field, Form, Formik } from 'formik';

const LoginPage = () => (
  <main className="page">
    <section className="auth-card">
      <h1>Войти</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={() => {}}
      >
        <Form className="auth-form">
          <label htmlFor="username">Ваш ник</label>
          <Field
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Пароль</label>
          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </section>
  </main>
);

export default LoginPage;
