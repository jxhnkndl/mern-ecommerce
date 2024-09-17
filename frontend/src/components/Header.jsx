import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      {/* Navbar collapses at large breakpoint and has dark theme */}
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          {/* This is a react-router-bootstrap component for wrapping blocks in React friendly links */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt='ProShop' />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          {/* Hamburger icon */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {/* Collapsible hamburger menu */}
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
