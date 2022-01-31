import React, { useState } from 'react';
import { Form, Button, FormGroup,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutSteps from '../components/checkoutSteps';

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state=> state.cart);
    const {shippingAddress} = cart;

    if(!shippingAddress){
        history.push('/shipping');
    }

    const dispatch = useDispatch();
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <h1>Payment Method</h1>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <FormGroup>
               <Form.Label as="legend">Select Method</Form.Label>
               <Col>
               <Form.Check 
               type="radio"
               label="PayPal or credit card"
               id="PayPal"
               name="paymentMethod"
               value="PayPal"
               checked
               onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
               
               {/* <Form.check
               type="radio"
               label="Stripe"
               id="Stripe"
               name="paymentMethod"
               value="Stripe"
               onChange={(e) => setPaymentMethod(e.target.value)}></Form.check> */}

               </Col>
               </FormGroup>
               <FormGroup>
               <Button type="submit" variant="primary" className="my-3">
                    Continue
                </Button>
               </FormGroup>

            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;

