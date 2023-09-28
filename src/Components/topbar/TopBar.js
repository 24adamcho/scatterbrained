import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './TopBar.css';

function TopBar() {
  return (
    <Navbar>
      <Container>
        <Nav>
            <Nav.Link href='#test'>Test</Nav.Link>
        </Nav>
        <Navbar.Brand href='#scatterbrained'>Scatterbrained</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default TopBar;