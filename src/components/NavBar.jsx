import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from './Cart';


const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
      <>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>E-Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Log in</Nav.Link>
              <Nav.Link as={Link} to="/purchases">Product</Nav.Link>
              <Nav.Link onClick={handleShow}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose}/>
   </>
    );
};

export default NavBar;