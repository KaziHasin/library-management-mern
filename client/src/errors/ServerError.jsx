import React from "react";

const ServerError = ({ error }) => {
    return (
        <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
        >
            <strong>Error! </strong>
            {error.status === 401
                ? "Login required..."
                : "An unexpected error occurred...."}
        </div>
    );
};

export default ServerError;
