import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import { Form ,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails,updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET,PRODUCT_DETAILS_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = ({match,history}) => {

    const productId = match.params.id;

    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [image,setImage] = useState('');
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock,setCountInStock] = useState('');
    const [description,setDescription] = useState('');
    const [uploading,setUploading] = useState(false);

    const productDetails = useSelector((state) => state.productDetails);
    const {
        loading,
        error,
        product
      } = productDetails;

      console.log(product,'edit product');

      const productUpdate = useSelector((state) => state.productUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
      if (successUpdate) {
        dispatch({type:PRODUCT_UPDATE_RESET});
        // dispatch({ type: PRODUCT_DETAILS_RESET});
        history.push('/admin/productlist');
    }
             
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
                // console.log(loading,'editProduct');
                } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
                }
        
        }, [dispatch,history, product, productId,successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ _id: productId, name, price,image,brand,category,countInStock,description}));
    }

    const uploadFileHandler = async(e) =>{

       const file = e.target.files[0];
       const formData = new FormData();
       formData.append('image',file);
       setUploading(true);

       try{
         const config = {
           headers: { 
             'Content-Type': 'multipart/form-data',

           }
         }
         const { data } = await axios.post('/api/upload',formData,config);
         setImage(data);
         setUploading(false);
       }
       catch(error){
         console.error(error);
         setUploading(false);
       }
    }


    return (
        <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Go Back
        </Link>

        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  label="Enter image Url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <input type='file' id='image-file' label='Choose File' onChange={uploadFileHandler}></input>
                {uploading && <Loader/>}
              </Form.Group>
              <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  label="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
              <Form.Label>category</Form.Label>
                <Form.Control
                  type="text"
                  label="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStpock">
              <Form.Label>CountInStock</Form.Label>
                <Form.Control
                  type="number"
                  label="Enter count in Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  label="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="my-5">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </>
    )
}

export default ProductEditScreen;
