import React, { Component, useMemo, useState} from 'react';

import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import { Button } from 'react-bootstrap';

import 'reactflow/dist/style.css';
import './GraphEditor.css'
import {ReactComponent as AddNoteIcon } from './add-note-svgrepo-com.svg'

import NoteNode from './NoteNode';
// const nodeTypes = {note:NoteNode}
const getNodeId = () => `${String(+new Date()).slice(6)}`;

function GraphEditor(props){
    const nodeTypes= useMemo(() => ({note: NoteNode}), []);

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
        
        console.log(`New note ${id} added at ${center.x}, ${center.y}`)
        const newNode = {
            id,
            type:'note',
            position:center,
            data:''
        }
        setNodes((nds) => nds.concat(newNode));
        console.log(nodes);
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