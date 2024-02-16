import { Badge, Card, Container, Table } from 'react-bootstrap';

const TransactionHistory = ({ transactions }) => {
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
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.book.name}</td>
            <td>{transaction.dueDate}</td>
            <td><Badge bg={`${transaction.transactionType =='returned' ? 'success' : 'primary'}`} className="pb-2">{transaction.transactionType}</Badge></td>
          </tr>
        ))}
      </tbody>
    </Table>
           </div>
    </Card>
    </Container>
  );
};

export default TransactionHistory;
