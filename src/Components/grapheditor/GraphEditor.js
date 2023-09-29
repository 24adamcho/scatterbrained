import { Component, useState} from 'react';

import ReactFlow, { Controls, Background } from 'reactflow';
import { Button } from 'react-bootstrap';

import 'reactflow/dist/style.css';
import './GraphEditor.css'
import {ReactComponent as AddNoteIcon } from './add-note-svgrepo-com.svg'

function GraphEditor(props){
    const [bgstyle, setBgstyle] = useState('cross');

    return (
        <>
            <div className='flowInterfaceWrapper' style={{height:'100%'}}>
                <Button className='addNoteButton' variant='primary'>
                    <AddNoteIcon />
                </Button>
                <ReactFlow>
                    <Background variant={bgstyle}/>
                    <Controls></Controls>
                </ReactFlow>
            </div>
        </>
    )
}

export default GraphEditor;