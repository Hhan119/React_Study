import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function BsNavBar() {
         // 로그인 된 사용자명이 있는지 store에서 읽어와본다.
         const userName = useSelector(state=>state.userName)
    return (
           <Navbar expand="md" className="bg-primary mb-2" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Acorn</Navbar.Brand>
                <Navbar.Toggle aria-controls="one"/>
                <Navbar.Collapse id="one">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/members">Member</Nav.Link>
                    </Nav>
                    { userName ? 
                    <>
                        <Nav>
                            <Nav.Link>{userName}</Nav.Link>
                            <span className="navbar-text">Signed in</span>
                        </Nav>
                        <Button variant="outline-danger">Logout</Button>
                    </>
                    :
                    <Button className="border">Sign in</Button> 
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
     
        
    );
}

export default BsNavBar;