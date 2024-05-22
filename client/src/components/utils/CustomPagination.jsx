import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../slices/userSlice';

const CustomPagination = ({ onPageChange, currentPage, itemsPerPage }) => {
    const { totalPages, totalData } = useSelector((state) => state.paginationHelperData);
    const users = useSelector(selectUsers);

    console.log(itemsPerPage);
    const handlePageClick = (number) => {
        onPageChange(number);
    }
    const startIndex = (0, currentPage - 1) * itemsPerPage;
    const distanceEntry = itemsPerPage * currentPage;
    const toEntry = itemsPerPage === users.length ? distanceEntry : distanceEntry - (itemsPerPage - users.length);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <div className="d-flex justify-content-between mt-2">
            <div>Showing {startIndex + 1} to {toEntry} of {totalData} entries</div>
            <Pagination>{items}</Pagination>
        </div>
    )
}

export default CustomPagination