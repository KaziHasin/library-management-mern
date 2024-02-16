import { Container, Row, Col, Breadcrumb, Button, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import UserForm from './UserForm';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../slices/api/userApiSlice';
import { addUser, setSuccessMessage } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

const UserAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleAddUser = async (userData) => {
    try {
      const res = await register(userData);
  
      if (res.data && res.data.status === 'success') {
        const message = res.data.message;
        const user = res.data.user;
        dispatch(setSuccessMessage(message));
        dispatch(addUser(user));
        navigate('/dashboard/users');
      } else {
        const validationErrors = res.error?.data;
  
        if (validationErrors) {
          const isDuplicateEmail = validationErrors.error?.includes('email_1 dup key');
  
          if (isDuplicateEmail) {
            toast.error('Email is already in use.');
          } else {
            // Display other validation errors
            Object.keys(validationErrors).forEach((field) => {
              let errorMessage = validationErrors[field];
                const colonIndex = errorMessage.indexOf(':');
                errorMessage = errorMessage.slice(colonIndex + 1).trim();
              toast.error(errorMessage);
            });
          }
        } else {
          // Handle other error scenarios
          toast.error('An error occurred. Please try again.');
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('An error occurred. Please try again.');
    }
  };
  


  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
        <Breadcrumb.Item>Add</Breadcrumb.Item>
      </Breadcrumb>

      <Container className='px-md-5'>
        <Row className="my-4">
          <Col>
            <h4 className="mb-0">Users</h4>
          </Col>
          <Col>
            <Button variant="dark" as={Link} to="/dashboard/users" className="float-end">
              <FaArrowLeft /> Back
            </Button>
          </Col>
        </Row>
        <Row>
          <Card className="shadow-sm border-0 py-4 px-3">
            <UserForm onSubmit={handleAddUser} />
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default UserAdd;
