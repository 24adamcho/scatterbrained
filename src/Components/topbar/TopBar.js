import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './TopBar.css';
import { useState } from 'react';

function TopBar(props) {
  const [nightmodeStateText, changeNightModeStateText] = useState('Night Mode');
  const nightmodeButton = () => {
    props.changeStyle();

    if(nightmodeStateText == 'Night Mode')
      changeNightModeStateText('Light Mode');
    else
      changeNightModeStateText('Night Mode');
  }

  return (
    <Navbar>
      <Container>
        <Nav>
            <NavDropdown title='File'>
              <NavDropdown.Item >Open File</NavDropdown.Item>
              <NavDropdown.Item >Save File</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Edit'>
              <NavDropdown.Item >placeholder</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='View'>
              <NavDropdown.Item onClick={nightmodeButton}>{nightmodeStateText}</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Navbar.Brand href='#scatterbrained'>Scatterbrained</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default TopBar;