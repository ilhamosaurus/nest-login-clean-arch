import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const token = window.localStorage.getItem('token');
  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
