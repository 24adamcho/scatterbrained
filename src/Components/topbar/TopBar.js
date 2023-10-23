import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './TopBar.css';
import { useState } from 'react';

function TopBar(props) {

  //button interractivity to change between night and light modes
  const [nightmodeStateText, changeNightModeStateText] = useState('Night Mode');
  const nightmodeButton = () => {
    props.changeStyle();  //have to use this gross piece of shit because i can't just call two functions in one onClick event (...i think)

    if(nightmodeStateText == 'Night Mode')
      changeNightModeStateText('Light Mode');
    else
      changeNightModeStateText('Night Mode');
  }

  const openFile = async () => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.addEventListener('change', () => {
        resolve(input.files[0]);
      });
      input.click();
    });
  }
  const open = () => {
    openFile().then(function (file) {
      var reader = new FileReader();
      reader.addEventListener('load', (event)=> {
        let data = JSON.parse(event.target.result)
        console.log(data)

        props.nodeRef.current.setNewNodes(data.nodes)
        props.nodeRef.current.setNewEdges(data.edges)
      });
      reader.readAsText(file);
    })
  }

  const saveFile = async (blob) => {
    const a = document.createElement('a');
    a.download = 'scatterbrained.json';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  }
  const save = () => {
    let sanitizedNodes = props.nodeRef.current.getNodes().map((node) => {
      node.selected=false;
      return node;
    })
    console.log(sanitizedNodes);
    
    let slug = {nodes:props.nodeRef.current.getNodes(),
                edges:props.nodeRef.current.getEdges()}
    
    const blob = new Blob([JSON.stringify(slug, null,2)], {type:'application/json'});

    saveFile(blob);
  }

  return (
    <Navbar>
      <Container>
        <Nav>
            <NavDropdown title='File'>
              <NavDropdown.Item onClick={open}>Open File</NavDropdown.Item>
              <NavDropdown.Item onClick={save}>Save File</NavDropdown.Item>
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