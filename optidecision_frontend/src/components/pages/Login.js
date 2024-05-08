import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

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
        <MDBContainer fluid style={{ backgroundColor: '#A1EAFB', minHeight: '100vh' }}>
            <MDBRow className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <MDBCol md='8' lg='6'>
                    <MDBCard className='text-black' style={{ borderRadius: '15px', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
                        <MDBCardBody>
                            <MDBRow className="justify-content-center mb-4">
                                <MDBCol md="8" className="text-center">
                                    <p className="text-center h2 fw-bold mb-2" style={{ color: '#0F1035' }}>Connexion</p>
                                    <form onSubmit={handleSubmit} className="p-4 p-md-5">
                                        <div className="mb-3 text-start">
                                            <MDBIcon fas icon="envelope me-2" size='lg' style={{ color: '#7FC7D9' }} />
                                            <span style={{ color: '#0F1035' }}>Votre email</span>
                                            <MDBInput label='' id='formBasicEmail' type='email' className='w-75 mx-auto' name="email" value={formData.email} onChange={handleChange} style={{ backgroundColor: '#FAF3EB', border: 'none', borderRadius: '10px' }} />
                                        </div>
                                        <div className="mb-3 text-start">
                                            <MDBIcon fas icon="lock me-2" size='lg' style={{ color: '#7FC7D9' }} />
                                            <span style={{ color: '#0F1035' }}>Mot de passe</span>
                                            <MDBInput label='' id='formBasicPassword' type='password' className='w-75 mx-auto' name="password" value={formData.password} onChange={handleChange} style={{ backgroundColor: '#FAF3EB', border: 'none', borderRadius: '10px' }} />
                                        </div>
                                        <div className="mb-3 text-start">
                                            <MDBCheckbox name='rememberMe' value='' id='formBasicCheckbox' label='Se souvenir de moi' style={{ color: '#0F1035' }} checked={formData.rememberMe} onChange={handleChange} />
                                        </div>
                                        <MDBBtn className='mb-3' size='lg' style={{ backgroundColor: '#0F1035' }}>Connexion</MDBBtn>
                                    </form>
                                    <div className="text-center mt-3">
                                        Vous n'avez pas de compte ? <a href="/register" className="text-primary">Inscrivez-vous</a>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
