import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Breadcrumb, Card, Button, Col, CardHeader } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserTable from './UserTable';
import { useGetUsersQuery } from '../../../../slices/api/userApiSlice';
import { resetMessage } from '../../../../slices/messageSlice';
import { addUser, selectUsers, resetUsers, } from '../../../../slices/userSlice';
import Loader from '../../../utils/Loader';
import withToast from '../../../../hoc/withToast';
import Heading from '../../../layout/Heading';


const UsersList = ({ showSuccess }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const message = useSelector((state) => state.message.message)

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
    if (message) {
      showSuccess(message);
      dispatch(resetMessage());
    }
  }, [dispatch, message]);

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

      <Container className='px-md-2'>

        <Heading heading="Users" breadcrumb={<span>Dashboard <span className='fs-4'>&#8250;</span> Users</span>} />

        <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
          <Row className="my-4">
            <Col>

            </Col>
            <Col>
              <Button variant="primary" as={Link} to="/dashboard/users/add" className="float-end">
                <FaPlus /> Add
              </Button>
            </Col>
          </Row>
          <Row>

            <UserTable users={users} />

          </Row>
        </Card>
      </Container>
    </>
  );
};

export default withToast(UsersList);
