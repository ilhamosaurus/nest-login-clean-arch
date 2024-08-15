import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const successMessage = window.localStorage.getItem('message');
  setInterval(() => {
    setSuccess(successMessage);
    window.localStorage.removeItem('message');
  }, 3000);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const url = `${baseUrl}/login`;
      const { data: res } = await axios.post(url, data);
      console.log(res.access_token);
      window.localStorage.setItem('token', res.access_token);
      window.location = '/';
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {success && <div className={styles.success_msg}>{success}</div>}
            <button type="submit" className={styles.green_btn}>
              Log In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
