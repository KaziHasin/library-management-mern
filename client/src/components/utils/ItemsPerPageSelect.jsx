import React from "react";
import { Form } from "react-bootstrap";

const ItemsPerPageSelect = ({ itemsPerPage, onItemsPerPageChange }) => {
    return (
        <div className="d-flex align-items-center">
            <Form.Select
                className="me-1 pe-3"
                aria-label="Select per page"
                size="sm"
                style={{ width: "60px" }}
                value={itemsPerPage}
                onChange={onItemsPerPageChange}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Form.Select>
            <small>entries per page</small>
        </div>
    );
};

export default ItemsPerPageSelect;
