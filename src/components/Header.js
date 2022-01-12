import React, { Component } from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className='shadow-sm'>
                <Container>
                    <Navbar.Brand style={{fontFamily : "HK Modular, Roboto",textTransform : "uppercase" ,textShadow : "-2px 0px #fa66ff" ,letterSpacing  : "0.3rem"}}>Entertainment Ayam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/" className='nav-link'>Home</Link>
                            <Link to="/report" className='nav-link'>Report</Link>
                            <Link to="/search" className='nav-link'>Search</Link>
                            <Link to='/guide' className='nav-link'>Guide</Link>
                            <Link to="/about" className='nav-link'>About</Link>
                    
                            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
