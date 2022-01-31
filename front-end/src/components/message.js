import React from 'react'
import {Alert} from 'react-bootstrap';

const message = ({variant , children}) => {
    return (
        <div>
            <Alert variant={variant}>{children}</Alert>
        </div>
    )
}

message.defaultProps = {
    variant: "info"
};

export default message;
