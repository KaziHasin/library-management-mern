import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookForm = ({ categories }) => {
  
  const initialFormData = {
    name: '',
    author: '',
    currentAvailability: true,
    stock: '',
    category: '', 
  };

  const [formData, setFormData] = useState(initialFormData);
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
      console.log('Form submitted:', formData);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">Please provide book name.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">Please provide author name.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories && categories.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Available</Form.Label>
          <Form.Select
            name="currentAvailability"
            value={formData.currentAvailability}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">Please provide quantity.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mt-2 mx-2 float-end">
        <Button variant="dark" as={Link} to="/dashboard/users" className="w-auto me-2">
          Back
        </Button>
        <Button type="submit" className="w-auto">
          Create
        </Button>
      </Row>
    </Form>
  );
};

export default BookForm;
