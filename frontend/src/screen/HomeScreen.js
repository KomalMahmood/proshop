import React from 'react'
import { Row, Col } from 'react-bootstrap';
// import products from '../products.js';
import Product from '../components/Product.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions.js';
import Loader from '../components/loader.js';
import Message from '../components/message.js';
import Paginate from '../components/Paginate.js';
import ProductCarousel from '../components/ProductCarousel.js';

const HomeScreen = ({match}) => {


    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
     
    // using hooks 
    // const [products, setProducts] = useState([]);

    // works as componentDidMount here
    // useEffect (()=>{

    // async arrow function (fetchProducts)
    // const fetchProducts = async () =>{

    // axios.get and result is returned that contains multiple things/info other than data too so we 
    // destructured data like ({ data } syntax will give only data from result) as we only need data
    // not other info returned

    // const { data } = await axios.get('/api/products'); 
    // did'nt give complete server password because we have defined it in proxy in package.json in root so path after i.e, localhost:port

    //         setProducts(data);
    //         console.log(products);
    //     }

    //     fetchProducts();
    // },[]); 
    // if empty array argument is given its called only once (works as componentDidMount) otherwise it will 
    // be called whenever the state will be updated and will work as componentDidUpdate

    const dispatch = useDispatch();

    // const products = [];

    // useSelector is used to select/consume the whole store state (provide by provider to whole app) in any component
    const productList = useSelector((state) => state.productList);
    const { loading, error, products,page,pages } = productList;


    useEffect(() => {

        dispatch(listProduct(keyword,pageNumber));

    }, [dispatch,keyword,pageNumber]);

    

    return (

        
        <>
        <br />
            {!keyword && <ProductCarousel />}
            <br /><br />
            <h1 style={{textAlign:'left'}}>Latest Products</h1><br/>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* <h3>{product.name}</h3> */}
                        <Product product={product} />
                    </Col>

                ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword? keyword: ""} />
            </>}

        </>
    )
}

export default HomeScreen;
