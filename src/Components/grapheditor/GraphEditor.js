import React, { useMemo, useState } from 'react';

import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import { Button } from 'react-bootstrap';

import 'reactflow/dist/style.css';
import './GraphEditor.css'
import {ReactComponent as AddNoteIcon } from './add-note-svgrepo-com.svg'
import SidebarContextMenu from './SidebarContextMenu/SidebarContextMenu';

import NoteNode from './NoteNode';

const getNodeId = () => `${String(+new Date()).slice(6)}`;

const GraphEditor = React.forwardRef((
        { //properties
            propNodes, 
            propEdges, 
            editTextRef,
            subcontentWidth
        },
        ref
    ) => {
    const nodeTypes= useMemo(() => ({note: NoteNode}), []);

    const [instance, setInstance] = React.useState();
    const onInit = (reactFlowInstance) => setInstance(reactFlowInstance);
    const [bgstyle, setBgstyle] = useState('cross');
    const [nodes, setNodes, onNodesChange] = useNodesState(propNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(propEdges);

    const [edgeStyle, setEdgeStyle] = useState('straight');

    const [nodeId, setNodeId] = useState();
    const [prevNodeId, setPrevNodeId] = useState(); //used for when adding new notes

    //const [noteValue, setNoteValue] = useState('');

    //this is utterly fucking stupid, but there is no other way to put a node in the frame that doesn't involve
    //lacing hook spaghetti code through the whole project
    //oh, it also does some weird rart shit with importing presumably the entirety of react
    const addNote = () => {
        const id = getNodeId();
        
        console.log(nodes);
        let center = [0, 0];
        if(nodes.length <= 0) {
            center = instance.project({x:window.innerWidth / 4, 
                                       y:window.innerHeight / 2});
            console.log('nodes was empty! using ratio value');
        }
        else {
            let previousNode = nodes.find((element) => element.id === prevNodeId);
            center = {x:previousNode.position.x+15, 
                      y:previousNode.position.y+15};
            console.log('nodes had an element! using last known value touched')
            console.log(previousNode);
        }
        console.log(center);

        const newNoteNode = {
            id,
            type:'note',
            position:center,
            data:'',
        }
        console.log(newNoteNode);
        setNodes((nds) => nds.concat(newNoteNode));
        //change to new new id so that repeatedly added notes stagger, but using changeNodeId doesn't want to update the editor
        //sidestep this by *just* changing the node id
        setPrevNodeId(newNoteNode.id)
        
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
        setPrevNodeId(node.id);
        console.log(`changed id to ${node.id}`);
        nodes.map((nds) => {
            if(nds.id === node.id) 
            {
                editTextRef.current.editText(nds.data);
                // console.log(nds)
            }

            return nds;
        });
    }

    return (
        <>
            <div className='flowInterfaceWrapper' style={{height:'100%'}}>
                <Button className='addNoteButton' 
                        variant='primary' 
                        onClick={addNote} 
                        style={{right:`${subcontentWidth[1]}%`}}>
                    <AddNoteIcon />
                </Button>
                <SidebarContextMenu edgeStyleCallback={setEdgeStyle}/>
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