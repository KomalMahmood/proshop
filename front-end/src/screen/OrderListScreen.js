import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/message';
import Loader from '../components/loader';
import { listOrders } from '../actions/orderAction.js';
import { ORDER_DETAIL_RESET } from '../constants/orderConstants.js';

const OrderListScreen = ({history}) => {

        const dispatch = useDispatch();

        const userLogin = useSelector((state) => state.userLogin);
     const { userInfo } = userLogin;
    
     const orderList = useSelector((state) => state.orderList);
     const { loading, error, orders} = orderList;
    
    //  const productDelete = useSelector((state) => state.productDelete);
    //  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
     

      useEffect(() => {
     
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
            } else {
            history.push("/login");
            }
        
           
     }, [dispatch,history,userInfo,]);
    
     const deleteHandler = (id) => {
         console.log('deleted Order');
        if (window.confirm('Are you sure')) {
            //  dispatch(deleteProduct(id));
        }
         
    }
    
    
        return (
            <>
            <h1>Orders</h1>
            {loading ? (<Loader />) : error ? (
                <Message variant='danger'>{error}</Message>
            ) :
                (<Table striped bordered hover responsive className='table-sm'>
                <thead>
                 <tr>
                 <th>ID</th>
                 <th>USER</th>
                 <th>DATE</th>
                 <th>TOTAL</th>
                 <th>PAID</th>
                 <th>DELIVERED</th>
                 <th></th>
                 </tr>
                 </thead>
                <tbody>
                 {orders.map((order) => (
                 <tr key={order._id}>
                 <td>{order._id}</td>
                 <td>{order.user && order.user.name}</td>
                 {/* <td>{order.createdAt.substring(0,10)}</td> */}
                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                 <td>${order.totalPrice}</td>
                <td>
                 {order.ispaid ? (
                 order.paidAt.substring(0,10)
                 ) : (
                 <i className='fas fa-times' style={{ color: 'red' }}></i>
                 )}
                 </td>
                 <td>
                 {order.isDelivered? (
                 order.deliveredAt.substring(0,10)
                 ) : (
                 <i className='fas fa-times' style={{ color: 'red' }}></i>
                 )}
                 </td>
                <td>
                 <LinkContainer to={`/order/${order._id}`}>
                 <Button variant='light' className='btn-sm' onClick={()=> {dispatch({type:ORDER_DETAIL_RESET})}}>
                 Details
                 </Button>
                 </LinkContainer>
                 </td>
                </tr>
                 ))}
                 </tbody>
                 </Table>
                )}
        </>
        )
}

export default OrderListScreen;
