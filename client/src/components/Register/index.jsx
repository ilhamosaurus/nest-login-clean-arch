import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const url = `${baseUrl}/register`;
      const { data: res } = await axios.post(url, data);
      navigate('/login');
      window.localStorage.setItem('message', res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        return setError(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign In
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Nama"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
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
            <button type="submit" className={styles.green_btn}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
