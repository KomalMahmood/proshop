import React from 'react';
import {Link} from 'react-router-dom'; 
import { Container, Nav, Navbar,NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
// import '../App.css';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox.js';

const Header = () => {

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = ()=> {
        dispatch(logout());
    }

    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Nav.Link>
                <Navbar.Brand>Vvork-Tech-Store</Navbar.Brand>
              </Nav.Link>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Route render={({history})=> <SearchBox history={history}/>}/>
              {/* <SearchBox /> */}
              <Nav className="ml-auto" style={{marginLeft:'20rem'}}>
                <LinkContainer className="my-1" to="/cart">
                  <Nav.Link>
                    <Nav.Link>
                      <Link to="/cart" style={{ color: "lightgrey" }} >
                        <i className="fas fa-shopping-cart">Cart</i>
                      </Link>
                    </Nav.Link>
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown
                    className="my-3"
                    title={userInfo.name}
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer className="my-3" to="/login">
                    <Nav.Link>
                      <Link to="/login" style={{ color: "lightgrey" }}>
                        <i className="fas fa-user"></i> Sign In
                      </Link>
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown className="my-3" title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
}

export default Header
