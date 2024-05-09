import React, { useState } from 'react';
import { Container, Form, Card } from 'react-bootstrap';
import '../css/Contact.css';
function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Message sent! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center contact-container">
            <Card className="contact-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Contact Us</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group id="message" className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} required />
                        </Form.Group>
                        <button className="w-100 contact-button" type="submit">Send Message</button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-3 w-100 contact-info">
                <p>Alternatively, you can reach us at:</p>
                <p id='email'>Email: <a href='www.gmail.com'> contact@optidecision.com</a></p>
                <p id='email'>Phone: (123) 456-7890</p>
            </div>
        </Container>
    );
}

export default Contact;
