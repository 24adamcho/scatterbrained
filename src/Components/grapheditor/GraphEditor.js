import React, { Component, useMemo, useState} from 'react';

import ReactFlow, { Controls, Background, useNodesState, useEdgesState, Handle, Position } from 'reactflow';
import { Button } from 'react-bootstrap';

import 'reactflow/dist/style.css';
import './GraphEditor.css'
import {ReactComponent as AddNoteIcon } from './add-note-svgrepo-com.svg'

import ReactQuill from 'react-quill'; //for data display
import '../texteditor/TextEditor.css'
import 'react-quill/dist/quill.snow.css';

const nodeTypes = {note: NoteNode}
function NoteNode() {
    const [value, setValue] = useState('');
    return (
        <>
            <Handle
                position={Position.Top}
                isValidConnection={(connection) => connection.source = connection.target}
                onConnect={(params) => console.log('handle pnConnect', params)}

                isConnectableStart={true}
                isConnectableEnd={true}
            />
            <ReactQuill
                value={value}
                placeholder='Empty node.'
                readOnly={true}
                theme='snow'
            />
            <p> test</p>
        </>
    )
}

const getNodeId = () => `${String(+new Date()).slice(6)}`;

function GraphEditor(props){
    // const nodeTypes= useMemo(() => ({note: noteNode}), []);

    const [instance, setInstance] = React.useState();
    const onInit = (reactFlowInstance) => setInstance(reactFlowInstance);
    const [bgstyle, setBgstyle] = useState('cross');
    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

    //this is utterly fucking stupid, but there is no other way to put a node in the frame that doesn't involve
    //lacing hook spaghetti code through the whole project
    //oh, it also does some weird rart shit with importing presumably the entirety of react
    const addNote = () => {
        const id = getNodeId();
        const center = instance.project({x:window.innerWidth / 4, y:window.innerHeight / 2});
        
        const newNode = {
            id,
            type:'note',
            position:center,
            width: '100px',
            height: '80px',
        }
        setNodes((nds) => nds.concat(newNode));
    }

    return (
        <>
            <div className='flowInterfaceWrapper' style={{height:'100%'}}>
                <Button className='addNoteButton' variant='primary' onClick={addNote}>
                    <AddNoteIcon />
                </Button>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={onInit}
                    nodeTypes={nodeTypes}
                    >
                    <Background variant={bgstyle}/>
                    <Controls></Controls>
                </ReactFlow>
            </div>
        </>
    )
}

export default GraphEditor;