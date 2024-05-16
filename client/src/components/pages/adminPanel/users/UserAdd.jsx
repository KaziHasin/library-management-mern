import { Container, Row, Col, Breadcrumb, Button, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import UserForm from './UserForm';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../../slices/api/userApiSlice';
import { addUser } from '../../../../slices/userSlice';
import { setMessage } from '../../../../slices/messageSlice';
import { toast } from 'react-toastify';
import Heading from '../../../layout/Heading';

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
        dispatch(setMessage(message));
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
      <Heading heading="Users" breadcrumb={<span>Dashboard <span className='fs-4'>&#8250;</span> Users <span className='fs-4'>&#8250;</span> Add</span>} />

      <Container className='px-md-2'>

        <Row>
          <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
            <UserForm onSubmit={handleAddUser} />
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default UserAdd;
