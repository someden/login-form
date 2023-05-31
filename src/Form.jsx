import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';

import Input from './Input';
import Feedback from './Feedback';
import Button from './Button';
import routes from './routes';

import styles from './Form.module.css';

export default function Form() {
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setTimeout(() => {
        setLoggedIn(false);
      }, 3000);
    }
  }, [loggedIn]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setError(null);
      const response = await fetch(routes.loginPath(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setLoggedIn(true);
        formik.resetForm();
      } else if (response.status === 401) {
        setError('Invalid email or password');
        inputRef.current.select();
      } else {
        setError('Unknown error');
      }
    },
  });

  return loggedIn ? (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome!</h1>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.field}>
          <Input
            className={styles.input}
            ref={inputRef}
            required
            label='Email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {error && <Feedback type='error'>{error}</Feedback>}
        </div>
        <div className={styles.field}>
          <Input
            className={styles.input}
            required
            label='Password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <Button className={styles.submit} type='submit' disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
