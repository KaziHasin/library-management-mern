import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { useGetProfileMutation, useUpdateProfileMutation, useUpdateProfilePictureMutation } from '../../../../slices/api/authApiSlice';
import { setAdminProfile } from '../../../../slices/authProfileSlice';
import { FaCamera } from "react-icons/fa";
import './adminProfile.css';
import withToast from '../../../../hoc/withToast';
import Heading from '../../../layout/Heading';

const AdminProfile = ({ showSuccess, showError }) => {
    const [imagePreview, setImagePreview] = useState("/images/default-fallback-image.png");
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: ""
    });


    const { id } = useParams();
    const adminProfile = useSelector((state) => state.adminProfile);

    const dispatch = useDispatch();

    const [getProfile, { loading }] = useGetProfileMutation();
    const [updateProfilePicture] = useUpdateProfilePictureMutation();
    const [updateProfile] = useUpdateProfileMutation();

    useEffect(() => {
        if (!adminProfile !== null) {
            getProfileData(id);
        }
    }, [id]);

    const getProfileData = async (id) => {
        try {
            const res = await getProfile(id);
            dispatch(setAdminProfile(res));
            if (res) {
                const profileFormData = {
                    ...res.data,

                };
                if (res.data.userImage) {

                    setImagePreview(`http://localhost:4000/${res.data.userImage}`);
                }
                setFormData(profileFormData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleImageChange = async (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await updateProfilePicture({ id, data: formData });

        } catch (error) {
            console.log(error);
        }

    }

    const handleCameraIconClick = () => {
        document.getElementById('fileInput').click();
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            const res = await updateProfile({ id, data: formData });
            if (res.data && res.data.status === 'success') {
                showSuccess(res.data.message)
            } else {
                const validationErrors = res.error?.data;
                Object.keys(validationErrors).forEach((field) => {
                    let errorMessage = validationErrors[field];
                    const colonIndex = errorMessage.indexOf(':');
                    errorMessage = errorMessage.slice(colonIndex + 1).trim().replace(',', '');
                    showError(errorMessage);
                })

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Heading heading="Admin Profile" breadcrumb={<span>Dashboard <span className='fs-4'>&#8250;</span> Profile</span>} />
            <Card className='border-0 rounded-1 p-4'>

                <Card.Body>

                    <Form onSubmit={submitHandler} className="p-3 pt-1">
                        <Row>
                            <Col xs="6">
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs="6">
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs="6">
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} readOnly onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs="6">
                                <Form.Group className="mb-5 text-center " controlId="name">
                                    <div className="image-container position-relative d-inline-block mt-2">
                                        <div className="overlay"></div>
                                        <img
                                            src={imagePreview}
                                            className="rounded-circle"
                                            alt="Avatar"
                                        />
                                        <FaCamera className="camera-icon position-absolute top-50 start-50 text-white fs-5" onClick={handleCameraIconClick} />
                                        <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
                                    </div>

                                </Form.Group>
                            </Col>

                            <Col className="text-center">
                                <Button variant="dark" as={Link} to="/dashboard" className="w-auto me-2">
                                    Back
                                </Button>
                                <Button type="submit">Update</Button>
                            </Col>
                        </Row>

                    </Form>

                </Card.Body>

            </Card>

        </Container>
    )
}

export default withToast(AdminProfile)