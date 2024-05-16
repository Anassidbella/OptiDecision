import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form validation and handling logic
        console.log(formData);
        alert('Registration Successful!');
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
