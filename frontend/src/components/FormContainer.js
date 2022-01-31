import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({children}) => {
    return (
        <div>
           <Container>
               <br/>
           <Row className="justify-content-md-center'">
               {/* <Col md={3}></Col> */}
               <Col xs={12} md={6}>
                    {children}
               </Col>
           </Row>    
           </Container> 
        </div>
    )
}

export default FormContainer
