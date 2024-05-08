import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

const cardDetails = [
    {
        name: 'Danny McLoan',
        occupation: 'Expert Ahp',
        articles: 41,
        followers: 976,
        rating: 8.5
    },
    {
        name: 'Alice Smith',
        occupation: 'Software Engineer',
        articles: 25,
        followers: 543,
        rating: 9.0
    },
    {
        name: 'John Doe',
        occupation: 'Expert Topsis',
        articles: 17,
        followers: 312,
        rating: 8.2
    },
    {
        name: 'Emily Johnson',
        occupation: 'Marketing Manager',
        articles: 33,
        followers: 789,
        rating: 8.8
    },
    {
        name: 'Michael Brown',
        occupation: 'Financial Analyst',
        articles: 29,
        followers: 654,
        rating: 8.7
    }
];

export default function Basic() {
    return (
        <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    {cardDetails.map((card, index) => (
                        <MDBCol key={index} md="9" lg="7" xl="5" className="mt-5">
                            <MDBCard style={{ borderRadius: '15px' }}>
                                <MDBCardBody className="p-4">
                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                            <MDBCardImage
                                                style={{ width: '180px', borderRadius: '10px' }}
                                                src="https://www.ahpnet.com/AHPNet/media/AHPNetMediaLibrary/Profile%20Pictures/AHP_Kurt_343-(002).jpg?width=343&height=343&ext=.jpg"
                                                alt={`Image de ${card.name}`}
                                                fluid
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <MDBCardTitle>{card.name}</MDBCardTitle>
                                            <MDBCardText>{card.occupation}</MDBCardText>

                                            <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                                                <div>
                                                    <p className="small text-muted mb-1">Articles</p>
                                                    <p className="mb-0">{card.articles}</p>
                                                </div>
                                                <div className="px-3">
                                                    <p className="small text-muted mb-1">Followers</p>
                                                    <p className="mb-0">{card.followers}</p>
                                                </div>
                                                <div>
                                                    <p className="small text-muted mb-1">Rating</p>
                                                    <p className="mb-0">{card.rating}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex pt-1">
                                                <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                                                <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                                            </div>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
