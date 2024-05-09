import React, { useState } from 'react';
//import { Button } from 'react-bootstrap';
import '../css/login.css'
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Login Submitted');
    };

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-form-header">
                        <h2>LOGIN</h2>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email address</label>
                        <input type="text" className="form-control" id="username" placeholder="Email address" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button type="submit" className="btn-custom">Login</button>
                </form>
                <div className="bottom-links">
                    <a href="./Register">Mot de passe oublié?</a> | <a href="./Register">Register</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;
