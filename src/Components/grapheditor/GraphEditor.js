import React, { useMemo, useState, useCallback, forwardRef, useEffect } from 'react';

import ReactFlow, { 
    Controls, 
    Background, 
    useNodesState, 
    useEdgesState,
    addEdge, 
    ReactFlowProvider,
    useStoreApi,
} from 'reactflow';
import { Button } from 'react-bootstrap';

import 'reactflow/dist/style.css';
import './GraphEditor.css'
import {ReactComponent as AddNoteIcon } from './add-note-svgrepo-com.svg'
import SidebarContextMenu from './SidebarContextMenu/SidebarContextMenu';

import NoteNode from './NoteNode';

const getTimeId = () => `${String(+new Date()).slice(6)}`;

const MIN_DISTANCE = 100;

const GraphEditor = forwardRef((
        { //properties
            propNodes, 
            propEdges, 
            editTextRef,
            subcontentWidth,
            setNodeCount,
            setEdgeCount
        },
        ref
    ) => {
    const nodeTypes= useMemo(() => ({note: NoteNode}), []);
    const store = useStoreApi();

    const [instance, setInstance] = useState();
    const onInit = (reactFlowInstance) => setInstance(reactFlowInstance);
    const [bgstyle, setBgstyle] = useState('cross');
    const [nodes, setNodes, onNodesChange] = useNodesState(propNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(propEdges);

    const [newEdgeStyle, setNewEdgeStyle] = useState('straight');
    const [tool, setTool] = useState('pointer')

    const [nodeId, setNodeId] = useState();
    const [prevNodeId, setPrevNodeId] = useState(); //used for when adding new notes
    
    useEffect(()=>{
        console.log(tool)
        setNodes((nds)=>{
            return nds.map((node)=>{
                node.data = {
                    ...node.data,
                    tool:tool,
                }
                return node;
            });
        });
    },[tool, setNodes])

    const onConnect = useCallback((params) => {
        // console.log(params);
      setEdges(
        (eds) => addEdge({...params, id:getTimeId(), type:newEdgeStyle}, eds)); 
        setEdgeCount(edges.length)
      }, [setEdges, newEdgeStyle, setEdgeCount, edges.length]
    );

    //this is utterly fucking stupid, but there is no other way to put a node in the frame that doesn't involve
    //lacing hook spaghetti code through the whole project
    //oh, it also does some weird rart shit with importing presumably the entirety of react
    const addNote = () => {
        const newid = getTimeId();
        
        // console.log(nodes);
        let center = [0, 0];
        if(nodes.length <= 0) {
            center = instance.project({x:window.innerWidth / 4, 
                                       y:window.innerHeight / 2});
            // console.log('nodes was empty! using ratio value');
        }
        else {
            let previousNode = nodes.find((element) => element.id === prevNodeId);
            center = {x:previousNode.position.x+15, 
                      y:previousNode.position.y+15};
            // console.log('nodes had an element! using last known value touched')
            // console.log(previousNode);
        }
        // console.log(center);

        const newNoteNode = {
            id:newid,
            type:'note',
            position:center,
            data:{
                content:'', 
                tool:tool
            },
            // style:{backgroundColor:'green'},
        }
        // console.log(newNoteNode);
        setNodes((nds) => nds.concat(newNoteNode));
        setNodeCount(nodes.length);
        //change to new new id so that repeatedly added notes stagger, but using changeNodeId doesn't want to update the editor
        //sidestep this by *just* changing the node id
        setPrevNodeId(newNoteNode.id)
        
        console.log(`New note ${newid} added at ${center.x}, ${center.y}`)
    }

    //editNote
    //SPAGHETTI MONSTER: DO NOT TOUCH
    React.useImperativeHandle(ref, () => ({
        editNote: (content) => {
            setNodes((nds) => {
                return nds.map((node) => {
                    if(node.id === nodeId) {
                        node.data = {...node.data, content:content};
                    // console.log(`changed note data to ${node.data}`)
                    }

                    return node;
                })
            });
        }
    }));

    const changeNoteId = (mouseEvent, node) => {
        setNodeId(node.id);
        setPrevNodeId(node.id);
        // console.log(`changed id to ${node.id}`);
        nodes.map((nds) => {
            if(nds.id === node.id) 
            {
                editTextRef.current.editText(nds.data.content);
                // console.log(nds)
            }

            return nds;
        });
    }

    const clearEditor = () => {
        setNodeId('');
        editTextRef.current.editText(undefined);
    }
    const onSelectionchange = (onSelectionChangeParams) => {
        if(onSelectionChangeParams.nodes.length == 0) clearEditor();
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
                <SidebarContextMenu 
                    edgeStyle={newEdgeStyle} 
                    edgeStyleCallback={setNewEdgeStyle}
                    setToolCallback={setTool}
                />
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={onInit}
                    nodeTypes={nodeTypes}
                    onNodeClick={changeNoteId}
                    onNodeDrag={(a, b) => {changeNoteId(a, b);}}
                    onConnect={onConnect}
                    connectionLineType={newEdgeStyle}
                    connectionLineStyle={{stroke:'var(--color-low)', strokeWidth:2}}
                    onNodesDelete={setNodeCount(nodes.length)}
                    onEdgesDelete={setEdgeCount(edges.length)}

                    onSelectionChange={onSelectionchange}
                    >
                    <Background variant={bgstyle}/>
                    <Controls></Controls>
                </ReactFlow>
            </div>
        </>
    )
}
)

export default forwardRef((props, ref) => {
    return (
    <ReactFlowProvider>
        <GraphEditor {...props} ref={ref} />
    </ReactFlowProvider>
    )
});