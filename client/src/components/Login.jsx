import React from 'react'
import { Container,InputGroup, Form, Card, Row, Col, Button } from 'react-bootstrap'

const Login = () => {
  return (

      <Container className="mx-auto mt-3">
        <Row className="d-flex justify-content-center">
      <Col xs md="6">
     <Card className="border-0 shadow p-3">
    
     <InputGroup className="my-3 mt-4">
        <Form.Control
          placeholder="Email or Username"
          aria-label="Email or Username"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
      <Card.Footer className="border-0 mb-2" style={{backgroundColor: "transparent"}}>
        <Button className="float-end" variant='dark'>Login</Button>
      </Card.Footer>
     </Card>
     </Col>
     </Row>

      </Container>

  )
}

export default Login