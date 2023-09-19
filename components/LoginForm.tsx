import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // Added state for login success

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://email-backend-py8v.onrender.com/auth/login', {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );

      localStorage.setItem('isLoggedIn', 'true');
      setLoginSuccess(true); // Set login success status
      router.push('/email');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-6">
        <div className="mb-5">
          <h2 className="text-center">Login</h2>
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
        {loginSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Login successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
