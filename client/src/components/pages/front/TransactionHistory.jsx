import { useEffect, useState } from 'react';
import { Badge, Card, Container, Table } from 'react-bootstrap';
import { selectUserTransactions, setTransactions } from '../../../slices/userTransactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTransactionQuery } from '../../../slices/api/UserTransactionApiSlice';

const TransactionHistory = () => {
  const transactions = useSelector((selectUserTransactions));
  const dispatch = useDispatch();

  const { data: getTransaction, error, isLoading } = useGetTransactionQuery();

  useEffect(() => {
    if (getTransaction) {
      dispatch(setTransactions(getTransaction));
    }

  }, [getTransaction, dispatch]);

  const formatDate = (date) => {
    const arrayDate = date.split("T");
    return arrayDate[0];
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <strong>Error! </strong> {error.status === 401 ? 'Login required...' : 'An unexpected error occurred....'}
      </div>
    )
  }
  return (
    <Container className="mt-3">
      <Card className="shadow border-0">
        <Card.Header className="py-3">
          Transaction History
        </Card.Header>
        <div className='table-responsive'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Due Date</th>
                <th>Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <tr><td>Loading....</td></tr> :
                <>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{transaction.book.name}</td>
                      <td>{formatDate(transaction.dueDate)}</td>
                      <td><Badge bg={`${transaction.transactionType == 'returned' ? 'success' : 'primary'}`} className="pb-2">{transaction.transactionType.toUpperCase()}</Badge></td>
                    </tr>
                  ))}
                </>
              }

            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
};

export default TransactionHistory;
