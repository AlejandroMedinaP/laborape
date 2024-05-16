import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Mi Aplicación</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#publicacion">Publicación</Nav.Link>
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/1">Personal</NavDropdown.Item>
              <NavDropdown.Item href="#action/2">Trabajo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3">Estudios</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/4">Otra Categoría</NavDropdown.Item>
            </NavDropdown>
            {/* Puedes agregar más elementos de navegación según sea necesario */}
          </Nav>
          <Nav>
            <Nav.Link href="#login">Iniciar Sesión</Nav.Link>
            <Nav.Link href="#signup">Registrarse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;