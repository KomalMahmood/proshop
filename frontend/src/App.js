// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { Container } from 'react-bootstrap';
import HomeScreen from './screen/HomeScreen';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import loginScreen from './screen/loginScreen';
import RegisterScreen from './screen/registerScreen';
import ProfileScreen from './screen/profileScreen';
import ShippingScreen from './screen/shippingScreen';
import PaymentScreen from './screen/paymentScreen';
import PlaceOrdersScreen from './screen/placeOrdersScreen';
import OrderScreen from './screen/orderScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <main className="py-3">
      <Container>
     {/* <h1>Welcome to Vvork shop!</h1> */}
     {/* <HomeScreen/> */}
     
     <Route path="/product/:id" component={ProductScreen} />
     <Route path="/cart" component={CartScreen} />
     <Route path="/login" component={loginScreen} />
     <Route path="/register" component={RegisterScreen} />
     <Route path="/profile" component={ProfileScreen} />
     <Route path="/shipping" component={ShippingScreen} />
     <Route path="/payment" component={PaymentScreen} />
     <Route path="/placeorder" component={PlaceOrdersScreen} />
     <Route path="/order/:id" component={OrderScreen} />

     <Route path="/admin/userList" component={UserListScreen} />
     <Route path="/admin/user/:id/edit" component={UserEditScreen} />

     <Route path="/admin/productList" component={ProductListScreen} exact />
     <Route path="/admin/productList/:pageNumber" component={ProductListScreen} exact />

     <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

     <Route path="/admin/orderList" component={OrderListScreen} />

     <Route path="/search/:keyword" component={HomeScreen} exact/>
     <Route path="/page/:pageNumber" component={HomeScreen} exact/>
     <Route path="/page/search/:keyword/:pageNumber" component={HomeScreen} exact/>
    
     <Route path="/" component={HomeScreen} exact />

     </Container>
     </main>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
