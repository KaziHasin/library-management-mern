import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import 'jquery/dist/jquery.min.js';
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDeleteUserMutation } from '../../../../slices/api/userApiSlice';
import { deleteStoreUser} from '../../../../slices/userSlice';
import { setMessage } from '../../../../slices/messageSlice';

const UserTable = ({ users, currentPage, itemsPerPage }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();


  const deleteUserHandler = async (userId) => {

    if (confirm("Are you sure want to delete this user?")) {

      try {
        const res = await deleteUser(userId);

        if (res.data && res.data.status === 'success') {
          const message = res.data.message;
          dispatch(setMessage(message));
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
  const startIndex = (0, currentPage - 1) * itemsPerPage;

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
      {users.length > 0 ? (
      users.map((user, index) => (
          <tr key={index}>
            <td>{startIndex + (index + 1)}</td>
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
         ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No data found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable