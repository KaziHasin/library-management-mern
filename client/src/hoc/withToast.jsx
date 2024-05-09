import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const withToast = (WrappedComponent) => {
    const enhanceComponent = (props) => {
        console.log(WrappedComponent);
        const showSuccess = (message) => {
            toast.success(message);
        };

        const showError = (message) => {
            toast.error(message);
        };

        return (
            <>
                <WrappedComponent
                    {...props}
                    showSuccess={showSuccess}
                    showError={showError}
                />

            </>
        );
    };

    return enhanceComponent;
};

export default withToast;
