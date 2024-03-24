import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Breadcrumb, Card, Button, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserTable from './UserTable';
import { useGetUsersQuery } from '../../../slices/api/userApiSlice';
import { addUser, selectUsers, resetUsers, setSuccessMessage, selectSuccessMessage } from '../../../slices/userSlice';
import Loader from '../../utils/Loader';
import { toast } from 'react-toastify';


const UsersList = React.memo(() => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const successMessage = useSelector(selectSuccessMessage);

  const { data: fetchedUsers, error, isLoading } = useGetUsersQuery();

  useEffect(() => {
    if (fetchedUsers) {
      dispatch(resetUsers());
      fetchedUsers.forEach((user) => {
        dispatch(addUser(user));
      });
    }
  }, [fetchedUsers, dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(setSuccessMessage(null));
    }
  }, [successMessage]);

  if (isLoading) {

    return (
      <div className="loading">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <strong>Error! </strong> {error.status === 401 ? 'Login required...' : 'An unexpected error occurred....'}
      </div>
    )
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>

      <Container className='px-md-5'>
        <Row className="my-4">
          <Col>
            <h4 className="mb-0">Users</h4>
          </Col>
          <Col>
            <Button variant="primary" as={Link} to="/dashboard/users/add" className="float-end">
              <FaPlus /> Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
            <UserTable users={users} />
          </Card>
        </Row>
      </Container>
    </>
  );
});

export default UsersList;
