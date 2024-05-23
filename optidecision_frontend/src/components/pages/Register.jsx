import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/api/register/', {
        username: formData.username,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        confirm_password: formData.confirmPassword,
      });
      alert('Registration Successful!');
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        setErrors(serverErrors);
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF8DC] px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#6C0345]">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-lg font-medium text-[#6C0345] mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
            />
            {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-lg font-medium text-[#6C0345] mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
            />
            {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-[#6C0345] mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium text-[#6C0345] mb-2">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>
          <div className="mb-4">
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
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-[#6C0345] mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-[#DC6B19] rounded focus:ring-[#DC6B19]"
              />
              <span className="ml-2 text-lg text-[#6C0345]">I accept the Terms and Conditions</span>
            </label>
            {errors.acceptTerms && <p className="text-red-500">{errors.acceptTerms}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#DC6B19] text-white py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#F7C566] hover:text-[#6C0345]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
