import { Container, Row, Col, Breadcrumb, Button, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import UserForm from './UserForm';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from '../../../slices/api/userApiSlice';
import { selectUserById, updateStoreUser, setSuccessMessage } from '../../../slices/userSlice';
import { toast } from 'react-toastify';


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
        dispatch(setSuccessMessage(message));
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
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>

      <Container className='px-md-5'>
        <Row className="my-4">
          <Col>
            <h4 className="mb-0">Users</h4>
          </Col>
          <Col>
            <Button variant="dark" as={Link} to="/dashboard/users" className="float-end"><FaArrowLeft /> Back</Button>
          </Col>
        </Row>
        <Row>
          <Card className="shadow-sm border-0 py-4 px-3">
            <UserForm onSubmit={handleUpdateUser} user={user} buttonText="Update User" />
          </Card>
        </Row>
      </Container>
    </>
  );

}

export default UserEdit