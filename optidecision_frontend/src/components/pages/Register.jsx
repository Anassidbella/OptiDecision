import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
} from 'mdb-react-ui-kit';

function Register() {
    return (
        <MDBContainer fluid style={{ backgroundColor: '#A1EAFB', minHeight: '100vh' }}>
            <MDBRow className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <MDBCol md='8' lg='6'>
                    <MDBCard className='text-black' style={{ borderRadius: '15px', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
                        <MDBCardBody>
                            <MDBRow className="justify-content-center mb-4">
                                <MDBCol md="6" className="text-center mb-4">
                                    <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' alt='Sign up image' />
                                </MDBCol>
                                <MDBCol md="8" className="text-center">
                                    <p className="text-center h2 fw-bold mb-2" style={{ color: '#0F1035' }}>Inscription</p>
                                    <div className="mb-3 text-start">
                                        <MDBIcon fas icon="user me-2" size='lg' style={{ color: '#7FC7D9' }} />
                                        <span style={{ color: '#0F1035' }}>Votre nom</span>
                                        <MDBInput label='' id='form1' type='text' className='w-75 mx-auto' style={{ backgroundColor: '#FAF3EB', border: 'none', borderRadius: '10px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <MDBIcon fas icon="envelope me-2" size='lg' style={{ color: '#7FC7D9' }} />
                                        <span style={{ color: '#0F1035' }}>Votre email</span>
                                        <MDBInput label='' id='form2' type='email' className='w-75 mx-auto' style={{ backgroundColor: '#FAF3EB', border: 'none', borderRadius: '10px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <MDBIcon fas icon="lock me-2" size='lg' style={{ color: '#7FC7D9' }} />
                                        <span style={{ color: '#0F1035' }}>Mot de passe</span>
                                        <MDBInput label='' id='form3' type='password' className='w-75 mx-auto' style={{ backgroundColor: '#FAF3EB', border: 'none', borderRadius: '10px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <MDBIcon fas icon="key me-2" size='lg' style={{ color: '#7FC7D9' }} />
                                        <span style={{ color: '#0F1035' }}>Répétez votre mot de passe</span>
                                        <MDBInput label='' id='form4' type='password' className='w-75 mx-auto' style={{ backgroundColor: '#FAF3EB', border: 'none', borderRadius: '10px' }} />
                                    </div>
                                    <div className='mb-3'>
                                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Abonnez-vous à notre newsletter' style={{ color: '#0F1035' }} />
                                    </div>
                                    <MDBBtn className='mb-3' size='lg' style={{ backgroundColor: '#0F1035' }}>S'inscrire</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;
