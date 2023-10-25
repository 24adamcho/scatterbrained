import React, { useMemo, useState, useCallback, forwardRef, useEffect, useRef } from 'react';

import ReactFlow, { 
    Controls, 
    Background, 
    useNodesState, 
    useEdgesState,
    addEdge, 
    ReactFlowProvider,
    useStoreApi,
    MiniMap,
    useReactFlow,
} from 'reactflow';
import { Button } from 'react-bootstrap';

import 'reactflow/dist/style.css';
import './GraphEditor.css'
import {ReactComponent as AddNoteIcon } from './add-note-svgrepo-com.svg'
import SidebarContextMenu from './SidebarContextMenu/SidebarContextMenu';
import CustomConnectionLines from './ConnectionLines/CustomConnectionLines';
import NoteNode from './NoteNode';
import TopbarContextMenu from './TopbarContextMenu/TopbarContextMenu';

const getTimeId = () => `${String(+new Date()).slice(6)}`;

const MIN_DISTANCE = 100;

const GraphEditor = forwardRef((
        { //properties
            propNodes, 
            propEdges, 
            editTextRef,
            subcontentWidth,
            setNodeCount,
            setEdgeCount,
            enableMiniMap,
            tool,
            setTool,
            width,
            keyBinds
        },
        ref
    ) => {
    const nodeTypes= useMemo(() => ({note: NoteNode}), []);
    const reactFlowWrapper = useRef(null);
    const {project} = useReactFlow();

    const [bgstyle, setBgstyle] = useState('cross');
    const [nodes, setNodes, onNodesChange] = useNodesState(propNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(propEdges);

    const [newEdge, setNewEdge] = useState({
        type:'straight',
        style: {
            strokeWidth:2,
        }
    })
    
    //loads edge stroke on init, because for whatever reason if you don't do it this very specific and very ugly way,
    //everything shits itself.
    useEffect(()=>{
        setNewEdge({
            ...newEdge,
            style:{
                ...newEdge.style,
                stroke:window.getComputedStyle(document.getElementById('App')).getPropertyValue('--color-low-trans')
            }
        })
    },[])

    const [nodeId, setNodeId] = useState('');
    const [prevNodeId, setPrevNodeId] = useState(''); //used for when adding new notes

    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);
    
    //update nodes with tool data on change
    useEffect(()=>{
        setNodes((nds)=>{
            return nds.map((node)=>{
                node.data = {
                    ...node.data,
                    tool:tool
                }
                return node;
            });
        });
        setEdges((eds)=> {
            return eds.map((edge)=>{
                edge={
                    ...edge,
                    interactionWidth:(tool==='pointer')?10:1
                }
                return edge;
            })
        })
    },[tool, setNodes])

    //change node count for bottombar
    useEffect(()=>{
        setNodeCount(nodes.length)
        setEdgeCount(edges.length)
    }, [nodes.length, edges.length])

    //on connecting a new edge
    const onConnect = useCallback((params) => {
        // console.log(params);
      setEdges(
        (eds) => addEdge({
            ...params, 
            ...newEdge,
            id:getTimeId()
        }, eds)); 
      }, [setEdges, newEdge]
    );

    const connectingNodeId = useRef(null);
    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
      }, []);
    const onConnectEnd = useCallback((params) => {
        if(tool === 'line') return;
        const targetIsPane = params.target.classList.contains('react-flow__pane')
        // console.log(params);
        if(targetIsPane) {
            const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
            const newId = getTimeId();
            const newNode = {
                id:newId,
                type:'note',
                position: project({ x: params.clientX - left - 75, y: params.clientY - top }),
                data:{
                    content:'', 
                    tool:tool
                },
            }
            const tempNewEdge = { 
                ...newEdge,
                id:newId, 
                source:connectingNodeId.current,
                target:newId
            }

            setNodes((nds)=>nds.concat(newNode));
            setEdges((eds)=>eds.concat(tempNewEdge));
        }
    }, [tool, setEdges, newEdge])

    //this is utterly fucking stupid, but there is no other way to put a node in the frame that doesn't involve
    //lacing hook spaghetti code through the whole project
    //oh, it also does some weird rart shit with importing presumably the entirety of react
    //adds a note at either some ratio of the window width and height or above and to the left of the previously inserted node
    const addNote = (data) => {
        const newid = getTimeId();
        // console.log(reactFlowWrapper.current)
        
        // console.log(nodes);
        let center = [0, 0];
        let previousNode = nodes.find((element) => element.id === prevNodeId)
        if(nodes.length <= 0 || previousNode === undefined) {
            center = project({x:(reactFlowWrapper.current.clientWidth / 2)-75, 
                                       y:reactFlowWrapper.current.clientHeight / 2});
            // console.log('nodes was empty! using ratio value');
        }
        else {
            center = {x:previousNode.position.x-15, 
                      y:previousNode.position.y-15};
            // console.log('nodes had an element! using last known value touched')
            // console.log(previousNode);
        }
        // console.log(center);

        const newNoteNode = {
            id:newid,
            type:'note',
            position:center,
            data:{
                content:data, 
                tool:tool
            },
            selected:true,
            // style:{backgroundColor:'green'},
        }
        // console.log(newNoteNode);
        setNodes((nds) => nds.concat(newNoteNode));
        //change to new new id so that repeatedly added notes stagger, but using changeNodeId doesn't want to update the editor
        //sidestep this by *just* changing the node id
        setPrevNodeId(newNoteNode.id)
        
        // console.log(`New note ${newid} added at ${center.x}, ${center.y}`)

        return newNoteNode;
    }

    //adds a note if no node is selected, ie when the pane is clicked
    const addNoteIfBlanked = (content) => {
        const shorthand = () => {
            let newnote = addNote(content);  //TROUBLESOME LINE
            if(newnote === undefined) return;
            setNodeId(newnote.id);
            setPrevNodeId(newnote.id);
        }
        if(prevNodeId === '' && content !== undefined) {
            shorthand();
        }
        else if(content !== undefined && content !== '<p><br></p>' && nodeId === '' && prevNodeId !== '') {
            shorthand();
        }
    }

    //editNote
    //SPAGHETTI MONSTER: DO NOT TOUCH
    React.useImperativeHandle(ref, () => ({
        editNote: (content) => {
            addNoteIfBlanked(content);
            setNodes((nds) => {
                return nds.map((node) => {
                    if(node.id === nodeId) {
                        node.data = {...node.data, content:content};
                    // console.log(`changed note data to ${node.data}`)
                    }

                    return node;
                })
            });
        },
        getNodes: () => {
            return nodes;
        },
        getEdges: () => {
            return edges;
        },
        setNewNodes:(nodeList)=>{
            setNodes(nodeList)
        }, 
        setNewEdges:(edgeList)=>{
            setEdges(edgeList)
        }
    }),[addNoteIfBlanked, nodes, edges, setNodes, setEdges]);

    //changes node id when a node is clicked
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

    //on clicking the background instead of a node or edge
    const onPaneClick = () => {
        clearEditor();
        setNodes((nds)=>{
            return nds.map((node)=>{
                return {
                    ...node,
                    selected:false
                }
            })
        })
    }

    const onSelectionChange = (params) => {
        setSelectedNodes(params.nodes);
        setSelectedEdges(params.edges);
    }

    const onNodeDoubleClick = (_, node) => {
        let connectedEdges = []
        edges.forEach((edge)=>{
            if(edge.source === node.id || edge.target === node.id) { 
                setEdges((eds)=>{
                    return eds.map((edgeModifiable)=>{
                        if(edgeModifiable == edge) {
                            edgeModifiable = {
                                ...edgeModifiable,
                                selected:true,
                            }
                        }
                        return edgeModifiable;
                    })
                })
                connectedEdges.push(edge);
            }
        })
        setSelectedEdges(connectedEdges);
    }

    return (
        <>
            <div className='flowInterfaceWrapper' style={{height:'100%'}} ref={reactFlowWrapper}>
                <Button className='addNoteButton' 
                        variant='primary' 
                        onClick={()=>{
                            let newNote = addNote('');
                            clearEditor();
                            changeNoteId(undefined, newNote);
                        }} 
                        style={{right:`${subcontentWidth[1]}%`}}>
                    <AddNoteIcon />
                </Button>
                <div className='toolsetOverlay' style={{width:width + '%'}}>
                    <SidebarContextMenu 
                        tool={tool}
                        setToolCallback={setTool}
                        keyBinds={keyBinds}
                    />
                    <TopbarContextMenu
                        nodes={nodes}
                        edges={edges}
                        setNodes={setNodes}
                        setEdges={setEdges}
                        selectedNodes={selectedNodes}
                        selectedEdges={selectedEdges}
                        tool={tool}
                        newEdge={newEdge}
                        setNewEdge={setNewEdge}
                    />
                </div>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    onNodeClick={changeNoteId}
                    onNodeDoubleClick={onNodeDoubleClick}
                    onNodeDrag={(a, b) => {changeNoteId(a, b);}}
                    onNodesDelete={clearEditor}
                    onConnect={onConnect}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    connectionLineType={newEdge.type}
                    connectionLineStyle={newEdge.style}
                    connectionLineComponent={CustomConnectionLines}
                    // connectionLineWrapperStyles={(newEdge.animated)?'animated':''}

                    onPaneClick={onPaneClick}
                    onSelectionChange={onSelectionChange}

                    deleteKeyCode={keyBinds.delete}
                    // selectionKeyCode={[keyBinds.dragSelect]}
                    // multiSelectionKeyCode={keyBinds.multiSelect}
                    >
                    <Background variant={bgstyle}/>
                    <Controls></Controls>
                    {enableMiniMap && (
                        <MiniMap position='bottom-left' 
                                 pannable
                                 style={{opacity:'50%'}}/>
                    )}
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