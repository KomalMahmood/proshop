import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/message';
import { addToCart , removeFromCart} from '../actions/cartAction.js';
import Product from '../components/Product';

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id;

    /* location gives info of product selected pathname etc and search gives whatever is after '?' question mark in route/route path ,
    thst is in this case auatity (qty) */
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    /* split string and returns an array of substrings , here we are splitting on the basis of '=' it return on 0 index ?qty  and on 
    1 index (actual quantity ordered) , converred into pure number*/

    console.log(qty);
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart
    console.log(cartItems, 'cartItems');

    const removeFromCartHandler = (id) => {
        console.log(id)
        dispatch(removeFromCart(id)); 
        };
        const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
        }

    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Message>
                    )
                        : (

                            <ListGroup variant="flush">
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCart(item.product, Number(e.target.value))
                                                        )
                                                    }
                                                >
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type="button"
                                                    variant="light"
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                    <h2>
                                        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                        items
                                    </h2>
                                    $
                                    {cartItems
                                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                                        .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

              
            

        </div>
    )
}

export default CartScreen;
