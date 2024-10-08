import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withToast from "../../../../hoc/withToast";
import { useGetUsersQuery } from "../../../../slices/api/userApiSlice";
import { resetMessage } from "../../../../slices/messageSlice";
import {
    setTotalData,
    setTotalPages,
} from "../../../../slices/paginationHelperSlice";
import {
    resetUsers,
    selectUsers,
    setUsers,
} from "../../../../slices/userSlice";
import Heading from "../../../layout/Heading";
import CustomPagination from "../../../utils/CustomPagination";
import Loader from "../../../utils/Loader";
import UserTable from "./components/UserTable";
import CustomCard from "../../../utils/CustomCard";
import ServerError from "../../../../errors/ServerError";
import ItemsPerPageSelect from "../../../utils/ItemsPerPageSelect";

const UsersList = ({ showSuccess }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const message = useSelector((state) => state.message.message);

    const {
        data: fetchedUsers,
        error,
        isLoading,
        refetch,
    } = useGetUsersQuery({
        page: currentPage,
        perPage: itemsPerPage,
        searchTerm,
    });

    useEffect(() => {
        if (fetchedUsers) {
            dispatch(resetUsers());
            dispatch(setTotalPages({ totalPages: fetchedUsers.totalPages }));
            dispatch(setTotalData({ totalData: fetchedUsers.totalUsers }));
            dispatch(setUsers(fetchedUsers.users));
        }
    }, [fetchedUsers, dispatch]);

    useEffect(() => {
        if (message) {
            showSuccess(message);
            dispatch(resetMessage());
            refetch();
        }
    }, [dispatch, message, refetch]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
        refetch();
    };

    const handleSearch = (e) => {
        setCurrentPage(1);
        setSearchTerm(e.target.value);
    };

    if (isLoading) {
        return (
            <div className="loading">
                <Loader />
            </div>
        );
    }
    if (error) {
        <ServerError error={error} />;
    }

    return (
        <>
            <Container fluid>
                <Heading
                    heading="Users"
                    breadcrumb={
                        <span>
                            Dashboard <span className="fs-4">&#8250;</span>{" "}
                            Users
                        </span>
                    }
                />

                <CustomCard>
                    <Row className="my-2">
                        <Col>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/dashboard/users/add"
                                className="float-end"
                            >
                                <FaPlus /> Add
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <div className="d-flex justify-content-between my-3">
                            <ItemsPerPageSelect
                                itemsPerPage={itemsPerPage}
                                onItemsPerPageChange={handleItemsPerPageChange}
                            />
                            <Form.Control
                                type="text"
                                value={searchTerm}
                                placeholder="Search......"
                                style={{ width: "230px" }}
                                onChange={handleSearch}
                            />
                        </div>
                        <UserTable
                            users={users}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                        <CustomPagination
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            dataLength={users.length}
                        />
                    </Row>
                </CustomCard>
            </Container>
        </>
    );
};

export default withToast(UsersList);
