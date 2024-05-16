import React, { Component } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: "home"
    };
  }

  handleNavClick = (section) => {
    this.setState({ activeSection: section });
    //alert(`${section}`)
  };

  render() {
    const { activeSection } = this.state;

    return (
      <header>
        <Navbar
          expand="sm"
          className={`bg-body-tertiary Navbar ${
            activeSection === "home" ? "home-active" : ""
          }`}
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Container className="container-nav">
            <Navbar.Brand href="/">ChongApi</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link
                  href="/home"
                  onClick={() => this.handleNavClick("home")}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  href="/about"
                  onClick={() => this.handleNavClick("about")}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  href="/local"
                  onClick={() => this.handleNavClick("Locales")}
                >
                  Locales
                </Nav.Link>
                <Nav.Link
                  href="/review"
                  onClick={() => this.handleNavClick("review")}
                >
                  Review
                </Nav.Link>
                <NavDropdown
                  title="Servicios"
                  id="nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action3">Ofertas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action4">Locales</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">YOLO</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default NavBar;