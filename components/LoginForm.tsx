import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Added state for loading

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true on click
      const response = await axios.post('https://email-backend-pz6o.onrender.com/auth/login', {
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
      setLoginSuccess(true);
      router.push('/email');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading after login attempt
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
        <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {loginSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Login successful!
          </div>
        )}
         {/* Registration Link */}
         <div className="mt-3 text-center">
          Don't have an account?{' '}
          <Link href="/signup">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
