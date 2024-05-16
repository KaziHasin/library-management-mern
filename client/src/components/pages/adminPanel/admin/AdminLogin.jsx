import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, InputGroup, Form, Card, Row, Col, Button, Toast } from 'react-bootstrap';
import { useLoginMutation } from '../../../../slices/api/authApiSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../../../slices/authSlice';


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (adminInfo) {
      navigate('/dashboard');
    }
  }, [navigate, adminInfo])


  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {

    try {
      const res = await login(formData).unwrap();
      dispatch(setLogin({ ...res }));
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.data || error.error);
    }

  }

  return (

    <Container className="mx-auto mt-3">
      <Row className="d-flex justify-content-center">
        <Col xs md="6">
          <Card className="border-0 shadow">
            <Card.Header className="border-0 bg-dark text-white py-3">
              Admin Login
            </Card.Header>
            <Card.Body className="mt-4">
              <InputGroup className="mb-5">
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email or Username"
                  aria-label="Email or Username"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <Form.Control
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Card.Body>
            <Card.Footer className="border-0 mt-0 pt-0 mb-3" style={{ backgroundColor: "transparent" }}>
              <Button disabled={isLoading} className="float-end" variant="dark" onClick={handleSubmit}>Login</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

    </Container>

  )
}

export default AdminLogin