import axios from 'axios';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

const Main = () => {
  const [user, setUser] = useState({
    name: '',
    username: '',
  });
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        return;
      }

      const baseUrl = process.env.REACT_APP_API_URL;
      const url = `${baseUrl}/user`;
      try {
        const { data: res } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res) {
          return;
        }
        setUser(res);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
        console.log(error);
      }
    };

    getUser();
  }, [token]);
  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Welcome to the clean architecture {user.name}!</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;
