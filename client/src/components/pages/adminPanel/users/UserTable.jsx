import { useEffect } from "react";
import { Table, Button } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useDispatch } from "react-redux";
import { useDeleteUserMutation } from '../../../../slices/api/userApiSlice';
import { deleteStoreUser, setSuccessMessage } from '../../../../slices/userSlice';
import { toast } from 'react-toastify';

const UserTable = ({ users }) => {

  const dispatch = useDispatch();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();


  const deleteUserHandler = async (userId) => {

    if (confirm("Are you sure want to delete this user?")) {

      try {
        const res = await deleteUser(userId);

        if (res.data && res.data.status === 'success') {
          const message = res.data.message;
          dispatch(setSuccessMessage(message));
          dispatch(deleteStoreUser({ id: userId }));
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred. Please try again.');
      }

    }

  }


  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>UserName</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.contactNumber}</td>
            <td>
              <Button variant="primary" className="me-2 btn-sm" as={Link} to={`/dashboard/users/edit/${user._id}`}>
                <FaEdit />
              </Button>
              <Button variant="danger" className="btn-sm" onClick={() => deleteUserHandler(user._id)}>
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable