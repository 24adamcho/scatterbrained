import React, { Component, useMemo, useState } from 'react';

import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import { Button } from 'react-bootstrap';

import 'reactflow/dist/style.css';
import './GraphEditor.css'
import {ReactComponent as AddNoteIcon } from './add-note-svgrepo-com.svg'

import NoteNode from './NoteNode';
// const nodeTypes = {note:NoteNode}
const getNodeId = () => `${String(+new Date()).slice(6)}`;

const GraphEditor = React.forwardRef((
        { //properties
            propNodes, 
            propEdges, 
            setEditorValue, 
            setChangeCurrentNodeDataFunction, 
            changeCurrentNodeData,
            editTextRef
        },
        ref
    ) => {
    const nodeTypes= useMemo(() => ({note: NoteNode}), []);

    const [instance, setInstance] = React.useState();
    const onInit = (reactFlowInstance) => setInstance(reactFlowInstance);
    const [bgstyle, setBgstyle] = useState('cross');
    const [nodes, setNodes, onNodesChange] = useNodesState(propNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(propEdges);

    const [nodeId, setNodeId] = useState();

    //const [noteValue, setNoteValue] = useState('');

    //this is utterly fucking stupid, but there is no other way to put a node in the frame that doesn't involve
    //lacing hook spaghetti code through the whole project
    //oh, it also does some weird rart shit with importing presumably the entirety of react
    const addNote = () => {
        const id = getNodeId();
        const center = instance.project({x:window.innerWidth / 4, y:window.innerHeight / 2});
        const newNoteNode = {
            id,
            type:'note',
            position:center,
            data:'',
        }
        setNodes((nds) => nds.concat(newNoteNode));
        
        console.log(`New note ${id} added at ${center.x}, ${center.y}`)
    }

    //editNote
    //SPAGHETTI MONSTER: DO NOT TOUCH
    React.useImperativeHandle(ref, () => ({
        editNote: (data) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if(node.id === nodeId) {
                        node.data = data;
                    // console.log(`changed note data to ${node.data}`)
                    }

                    return node;
                })
            );
        }
    }));

    const changeNoteId = (mouseEvent, node) => {
        setNodeId(node.id);
        console.log(`changed id to ${node.id}`);
        nodes.map((nds) => {
            if(nds.id === node.id) 
            {
                editTextRef.current.editText(nds.data);
                // console.log(nds)
            }
        });
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
                    onNodeClick={changeNoteId}
                    onNodeDrag={changeNoteId}
                    >
                    <Background variant={bgstyle}/>
                    <Controls></Controls>
                </ReactFlow>
            </div>
        </>
    )
}
)

export default GraphEditor;