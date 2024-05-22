import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('username',formData.username)
        alert('Login successful!');
        navigate('/demo');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-[#FFF8DC]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaReact className="text-6xl text-[#6C0345]" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-[#6C0345]">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium text-[#6C0345] mb-2">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-[#6C0345] mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#DC6B19] text-white py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#F7C566] hover:text-[#6C0345]"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-lg text-[#6C0345]">Don't have an account?</p>
          <button
            onClick={navigateToRegister}
            className="mt-2 bg-transparent text-[#DC6B19] py-2 px-4 rounded-md border border-[#DC6B19] text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#DC6B19] hover:text-white"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
