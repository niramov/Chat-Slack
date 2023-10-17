import React from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import SignUpForm from './SignUpForm.jsx';

const SignUpPage = () => {
  return (
    <Container fluid className='h-100 m-3'>
      <Row className='justify-content-center align-items-center h100'>
        <Card style={{ width: '30rem' }} className='text-center shadow-sm'>
          <Card.Body className='row'>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default SignUpPage;
