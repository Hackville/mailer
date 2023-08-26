import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make an API call to login
     
      const response = await axios.post('https://email-backend-py8v.onrender.com/auth/login', {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Set the content type to application/json
          // You can also add other headers if needed (e.g., authorization)
        },
      }
      );
      console.log(response)
      // If login is successful, set the authentication status in local storage
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to the email form page
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
      </div>
    </div>
  );
};

export default LoginForm;
