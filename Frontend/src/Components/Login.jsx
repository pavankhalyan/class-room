import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { role } = response.data;

      switch (role) {
        case 'principal':
          navigate('/principal');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          alert('Unknown role');
      }
    } catch (err) {
      alert('Login failed: ', err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Classroom Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={!email || !password}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
