import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [RegisterSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Added state for loading

  const handleRegister = async () => {
    try {
      setLoading(true); // Set loading to true on click
      const response = await axios.post('https://email-backend-pz6o.onrender.com/auth/register', {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );

      
      setRegisterSuccess(true);
      router.push('/');
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
          <h2 className="text-center">Register</h2>
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
        <button className="btn btn-primary w-100" onClick={handleRegister} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {RegisterSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Signup successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
