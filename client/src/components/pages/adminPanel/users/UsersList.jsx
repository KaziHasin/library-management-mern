import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withToast from '../../../../hoc/withToast';
import { useGetUsersQuery } from '../../../../slices/api/userApiSlice';
import { resetMessage } from '../../../../slices/messageSlice';
import { setTotalData, setTotalPages } from '../../../../slices/paginationHelperSlice';
import { addUser, resetUsers, selectUsers, } from '../../../../slices/userSlice';
import Heading from '../../../layout/Heading';
import CustomPagination from '../../../utils/CustomPagination';
import Loader from '../../../utils/Loader';
import UserTable from './UserTable';


const UsersList = ({ showSuccess }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const message = useSelector((state) => state.message.message)

  const { data: fetchedUsers, error, isLoading } = useGetUsersQuery(currentPage);

  useEffect(() => {
    if (fetchedUsers) {
      dispatch(resetUsers());
      dispatch(setTotalPages({ totalPages: fetchedUsers.totalPages }))
      dispatch(setTotalData({ totalData: fetchedUsers.totalUsers }))
      fetchedUsers.users.forEach((user) => {
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


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`Fetching data for page ${currentPage}`);
  }

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
          <Row className="my-2">
            <Col>
              <Button variant="primary" as={Link} to="/dashboard/users/add" className="float-end">
                <FaPlus /> Add
              </Button>
            </Col>
          </Row>
          <Row>

            <UserTable users={users} currentPage={currentPage} itemsPerPage={itemsPerPage} />
            <CustomPagination onPageChange={handlePageChange} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default withToast(UsersList);
