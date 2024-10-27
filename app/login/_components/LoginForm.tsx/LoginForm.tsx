'use client';
import { authenticate } from './_actions/authenticate';
import styles from './loginForm.module.css';
import { useFormState } from 'react-dom';

const LoginForm = () => {
  const [state , formAction] = useFormState(authenticate, undefined);
  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" required/>
      <input type="password" placeholder="password" name="password" required/>
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
