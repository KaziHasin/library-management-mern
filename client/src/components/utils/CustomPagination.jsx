import React from "react";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";

const CustomPagination = ({
    onPageChange,
    currentPage,
    itemsPerPage,
    dataLength,
}) => {
    const { totalPages, totalData } = useSelector(
        (state) => state.paginationHelperData
    );

    const handlePageClick = (number) => {
        onPageChange(number);
    };
    let startIndex = (0, currentPage - 1) * itemsPerPage;

    const distanceEntry = itemsPerPage * currentPage;
    const toEntry =
        itemsPerPage === dataLength
            ? distanceEntry
            : distanceEntry - (itemsPerPage - dataLength);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageClick(number)}
            >
                {number}
            </Pagination.Item>
        );
    }
    startIndex = totalData !== 0 ? startIndex + 1 : startIndex;
    return (
        <div className="d-flex justify-content-between mt-2">
            <div>
                Showing {startIndex} to {toEntry} of {totalData} entries
            </div>
            <Pagination>{items}</Pagination>
        </div>
    );
};

export default CustomPagination;
