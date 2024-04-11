import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Login() {
    console.log("login is being rendered");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [passwordShown, setPasswordShown] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Login Submitted');
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="justify-content-center w-100 mb-5"> {/* Adjusted margin-bottom for spacing */}
                <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="content-container">
                        <h2 className="text-3xl font-bold">Login </h2> {/* Enhanced title */}
                    </div>
                    <Form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-light">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={passwordShown ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                            <Form.Check type="checkbox" label="Show Password" onChange={togglePasswordVisibility} checked={passwordShown} className="mt-2" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                        <div className="text-center mt-3">
                            Don’t have an account? <a href="/register" className="text-primary">Register</a>
                        </div>
                        </Form>
                </Col>
            </Row>

        </Container>
    );
}


export default Login;
