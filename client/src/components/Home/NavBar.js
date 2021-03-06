// import Logo from '../styles/Logo.png'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Modal, Image, Container, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React, { useState } from 'react'

import { Link, useLocation } from 'react-router-dom'



const NavBar = () => {
  // const history = useHistory()
  const location = useLocation()

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // const handleUser = () => {
  //   history.push('/Register')
  //   handleClose()
  // }
  // const handleGroup = (event) => {
  //   console.log('event.target.group',event.target.group)
  //   window.location.pathname === '/home' ?
  //     history.push('/grouplogin') :
  //     history.push('/groupregister')
  // } 
  // { window.location.pathname === '/Login' ? 'Login Now' : 'Register Now' }
  return (
    <>

      <Navbar className="navbar-colour" Navbar bg="" variant="dark" >
        < Container >

          <Col></Col>
          <Col>
            <div className="logo-nav-items">
              <div className="logo">
                <Navbar.Brand href="/"><Image src="https://imgur.com/0C9foJS.jpeg" /></Navbar.Brand>
              </div>
              <div className="navbar-items">
                <Nav className="mr-auto">
                  <LinkContainer to='/'>
                    <Nav.Link href="#home">Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/activities'>
                    <Nav.Link href="#activities">Activities</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/groups'>
                    <Nav.Link href="#groups">Groups</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/Login'>
                    <Nav.Link href="#login" onClick={handleShow}>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='#' variant="primary" onClick={handleShow}>
                    <Nav.Link href="#register">Register</Nav.Link>
                  </LinkContainer>
                </Nav>
              </div>
            </div>
          </Col>
          <Col></Col>
        </Container>
      </Navbar>

      <section>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{location.pathname === '/Login' ? 'Login Now' : 'Register Now'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Select from the options below</Modal.Body>
          <Modal.Footer>
            <Link onClick={() => handleClose()} to={location.pathname === '/Login' ? '/Login' : '/Register'}>User</Link>
            <Link onClick={() => handleClose()} to={location.pathname === '/Login' ? '/grouplogin' : '/groupregister'}>Group</Link>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  )
}
export default NavBar