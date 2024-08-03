import { Container, Row, Col, Breadcrumb, Button, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import UserForm from './components/UserForm';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from '../../../../slices/api/userApiSlice';
import { selectUserById, updateStoreUser } from '../../../../slices/userSlice';
import { setMessage } from '../../../../slices/messageSlice';
import { toast } from 'react-toastify';
import Heading from '../../../layout/Heading';


const UserEdit = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id))

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdateUser = async (userData) => {
    try {
      console.log('User ID:', id);

      const res = await updateUser({ id, data: userData });
      console.log(res);

      if (res.data && res.data.status === 'success') {
        dispatch(updateStoreUser({ id: id, updatedUser: userData }));
        const message = res.data.message;
        const user = res.data.user;
        dispatch(setMessage(message));
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
  }
  return (
    <>
    <Container fluid>
      <Heading heading="Users" breadcrumb={<span>Dashboard <span className='fs-4'>&#8250;</span> Users <span className='fs-4'>&#8250;</span> Edit</span>} />
          <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
            <UserForm onSubmit={handleUpdateUser} user={user} buttonText="Update" />
          </Card>
      </Container>
    </>
  );

}

export default UserEdit