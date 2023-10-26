import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './TopBar.css';
import { useState, useEffect, useRef } from 'react';

//custom keybinds for saving and opening
function useKey(key, cb){
  const callback = useRef(cb);

  useEffect(() => {
      callback.current = cb;
  })

  useEffect(() => {
      function handle(event){
          if(event.code === key){
              callback.current(event);
          } else if (key === 'ctrls' && event.key === 's' && event.ctrlKey) {
              event.preventDefault();
              callback.current(event);
          } else if (key === 'ctrlo' && event.key === 'o' && event.ctrlKey) {
              event.preventDefault();
              callback.current(event);
          }
      }

      document.addEventListener('keydown',handle);
      return () => document.removeEventListener("keydown",handle)
  },[key])
}

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

  useKey('ctrls', () => save());
  useKey('ctrlo', () => open())

  const openFile = async () => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.addEventListener('change', () => {
        let t = input.files[0].name;
        props.setTitle(t.substring(0, t.lastIndexOf('.')))
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

        let sanitizedNodes = data.nodes.map((node) => {
          node.selected=false;
          if(node.data === undefined) node.data = {};
          node.data.tool=props.tool;
          if(node.data.content === undefined) node.data.content='';

          return node;
        })
        let sanitizedEdges = data.edges.map((edge) => {
          edge.interactionWidth=(props.tool === 'pointer')?10:1;
          return edge;
        })

        props.nodeRef.current.setNewNodes(sanitizedNodes)
        props.nodeRef.current.setNewEdges(sanitizedEdges)
      });
      reader.readAsText(file);
    })
  }

  const saveFile = async (blob) => {
    const a = document.createElement('a');
    a.download = (props.title === '') ? 'scatterbrained.json' : props.title;
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  }
  const save = () => {
    let sanitizedNodes = props.nodeRef.current.getNodes()
    // Object.assign(sanitizedNodes, props.nodeRef.current.getNodes())
    sanitizedNodes = sanitizedNodes.map((node) => {
      const {
        selected:_,
        dragging:__,
        positionAbsolute,___,
        data:____,
        ...newNode
      } = node;
      const {
        tool:_____,
        ...newNodeData
      } = node.data;
      if(newNodeData.content !== "" 
      && newNodeData.content !== "<p><br></p>")
        newNode.data = newNodeData;
      return newNode
    })

    let sanitizedEdges = props.nodeRef.current.getEdges()
    sanitizedEdges = sanitizedEdges.map((edge) => {
      const {
        selected:_,
        interactionWidth:__,
        ...newEdge
      } = edge;

      if(newEdge.animated === undefined) delete newEdge.animated
      if(newEdge.svgWrapperStyle === undefined) delete newEdge.svgWrapperStyle

      if(edge.style !== undefined){
        const {
          ...newEdgeStyle
        } = edge.style
        newEdge.style = newEdgeStyle
      }

      return newEdge;
    })
    
    let slug = {metadata:`
SCATTERBRAINED
`,//TODO: add git repo link
                title: props.title,
                nodes:sanitizedNodes,
                edges:sanitizedEdges
    }
    console.log(slug)
    
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
              <NavDropdown.Item onClick={props.changeMiniMapState}>Mini Map</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Navbar.Brand href='#scatterbrained'>Scatterbrained</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default TopBar;