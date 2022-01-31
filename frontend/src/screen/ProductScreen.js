// import {Link} from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
// import products from "../products";
import React,{useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { listProductDetails,createProductReview } from '../actions/productActions';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../components/loader.js';
import Message from '../components/message.js';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {

    console.log(match,"match");

    const [qty,setQty] = useState(1);

    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState('');

    console.log(match.params.id);

    const dispatch = useDispatch();

    
    const productDetails = useSelector((state)=> state.productDetails);
    const {loading , product, error} = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {loading:loadingProductReview,success:successProductReview,error:errorProductReview} = productReviewCreate;


    useEffect(()=> {
    
        if(successProductReview){
            console.log('submitted review');
            setRating(0);
            setComment('');
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET});
        }


         dispatch(listProductDetails(match.params.id))
    },[dispatch,match,successProductReview]);


    // console.log(product);

    // const product = products.find((p) => p._id === match.params.id);
    // console.log(products,"hhhhhh");
    // console.log(product.name);

    const addToCartHandler = () => {
        console.log(history,"history");
        history.push(`/cart/${match.params.id}?qty=${qty}`);
        }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id,{rating,comment}));

    }

    return (
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item variant="success">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    Price: ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price :</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status :</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "ot of stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {/* here we made an array of size countInStock (array of size -> the number of items 
                                                  available in stock) ,
                                                 then .keys() returns an array with keys from 0 to countInStock-1 as array index starts from 0, 
                                                 then we apply map on this array containing 0 to countInStock-1 and we make options for each item
                                                 +1 because count that we can order starts from 1 not 0 and max we can order is countInStock not
                                                 countInStock-1 */}
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {successProductReview && (
                      <Message variant="success">
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </div>
    );};

export default ProductScreen;




