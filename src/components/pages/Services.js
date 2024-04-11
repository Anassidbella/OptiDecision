import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';



function Services() {
    const navigate = useNavigate();
  
    const navigateToDemo = () => {
      navigate('/demo'); // Adjust the path as needed
    };
  
    return (
      <Container className="py-5">
        <h1 className="text-center mb-5">Why OptiDecision?</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Analytic Hierarchy Process (AHP)</Card.Title>
                <Card.Text>
                  AHP simplifies complex decision-making by breaking down the process into a hierarchy of more manageable parts. This approach allows for a systematic comparison of different criteria, ensuring every aspect of the decision is considered.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS)</Card.Title>
                <Card.Text>
                  TOPSIS identifies the option that best aligns with the ideal solution. This method not only highlights the most suitable choices but also ranks all available options, providing a clear overview of the alternatives.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Combining AHP and TOPSIS</Card.Title>
                <Card.Text>
                  By integrating AHP and TOPSIS, OptiDecision leverages the strengths of both methods to offer a comprehensive solution that ensures decisions are both optimally chosen and thoroughly evaluated against a set of criteria.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
  
          {/* You can add more cards here to describe additional services or benefits */}
        </Row>
        
        <div className="d-flex justify-content-center mt-4">
          <Button variant="primary" onClick={navigateToDemo}>Explore Our Tool</Button>
        </div>
      </Container>
    );
  }
  
  export default Services;
  
