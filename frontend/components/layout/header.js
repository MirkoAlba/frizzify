import { Navbar, Nav, Container } from "react-bootstrap";

import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(false);
  const handleActive = () => setActive(!active);

  return (
    <Navbar expand="lg" bg="black" className="fixed-top py-2 py-lg-4">
      <Container className="d-flex align-items-center justify-content-between h-100">
        <Navbar.Brand href="#">
          <h3 className="text-white">Logo</h3>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <div className="plates">
            <div
              className={`plate plate4 ${active && "active"}`}
              onClick={handleActive}
            >
              <svg
                className="burger"
                version="1.1"
                height="100"
                width="100"
                viewBox="0 0 100 100"
              >
                <path className="line line1" d="M 50,35 H 30" />
                <path className="line line2" d="M 50,35 H 70" />
                <path className="line line3" d="M 50,50 H 30" />
                <path className="line line4" d="M 50,50 H 70" />
                <path className="line line5" d="M 50,65 H 30" />
                <path className="line line6" d="M 50,65 H 70" />
              </svg>
              <svg
                className="x"
                version="1.1"
                height="100"
                width="100"
                viewBox="0 0 100 100"
              >
                <path className="line" d="M 34,32 L 66,68" />
                <path className="line" d="M 66,32 L 34,68" />
              </svg>
            </div>
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="#">Registrati | Accedi</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
