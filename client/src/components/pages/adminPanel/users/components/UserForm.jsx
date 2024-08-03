import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserForm = ({ onSubmit, user, buttonText }) => {
  const initialFormData = {
    username: '',
    name: '',
    email: '',
    contactNumber: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onSubmit(formData);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="johndoe4"
            name="username"
            value={formData.username}
            onChange={handleChange}

          />
          <Form.Control.Feedback type="invalid">Please provide a username.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            name="name"
            value={formData.name}
            onChange={handleChange}

          />
          <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="johndoe4@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}

          />
          <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="0000000000"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}

          />
          <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mt-2 mx-2 float-end">
        <Button variant="dark" as={Link} to="/dashboard/users" className="w-auto me-2">
          Back
        </Button>
        <Button type="submit" className="w-auto">
          {buttonText ?? 'Create'}
        </Button>
      </Row>
    </Form>
  );
};

export default UserForm;
