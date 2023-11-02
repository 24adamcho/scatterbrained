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
import NoteNode from './NoteNode';
import TopbarContextMenu from './TopbarContextMenu/TopbarContextMenu';
import { useKey } from './GraphEditorKeyhook';
import { sanitizeEdgesForStorage, sanitizeNodesFromStorage } from '../utils';
import { findById } from './TopbarContextMenu/Widgets/utils';
import PaneContext from './RightclickContextMenu/PaneContext';
import NodeContext from './RightclickContextMenu/NodesContext';

const getTimeId = () => `${String(+new Date())}.${String(Math.trunc(Math.random() * 100000))}`; //time id + a random 5 digit number if something is made in sub-millisecond time

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
    })

    //remove svgWrapperStyles for sanity's sake, since it's only used for connectionLines
    const sanitizeNewEdge = () => {
        const {
            style:tempNewEdgeStyle,
            svgWrapperStyle:_,
            reversed:__,
            ...tempNewEdge
        } = newEdge

        if(tempNewEdgeStyle === undefined) return tempNewEdge;
        if(Object.keys(tempNewEdgeStyle).length === 0) return tempNewEdge;
        else return {...tempNewEdge, style:tempNewEdgeStyle};
    }

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
        const sanitizedEdge = sanitizeNewEdge();
        if(newEdge.reversed === true) { const temp = params.source; params.source = params.target; params.target = temp}
        setEdges(
            (eds) => addEdge({
                ...sanitizedEdge,
                id:getTimeId(),
                source:params.source,
                target:params.target, 
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
            var previousNode = {};
            nodes.map(e=>{
                if(e.id===connectingNodeId.current){
                    previousNode=e;
                }
            })

            const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
            const newId = getTimeId();
            const newNode = {
                id:newId,
                type:'note',
                position: project({ x: params.clientX - left - 65, y: params.clientY - top - 8}),
                data:{
                    content:'', 
                    tool:tool
                },
                selected:true,
            }
            if(previousNode !== undefined)
                if(previousNode.style !== undefined)
                    newNode.style = previousNode.style;

            const sanitizedEdge = sanitizeNewEdge()
            const tempNewEdge = { 
                ...sanitizedEdge,
                id:newId, 
                source:connectingNodeId.current,
                target:newId
            }
            if(newEdge.reversed === true) { const temp = tempNewEdge.source; tempNewEdge.source = tempNewEdge.target; tempNewEdge.target = temp}

            setNodes((nds)=>nds.concat(newNode));
            setEdges((eds)=>eds.concat(tempNewEdge));
        
            //change selection to just be the new node
            clearEditor();
            changeNoteId(undefined, newNode)
            onSelectionChange({
                nodes:[newNode],
                edges:[]
            })
            setNodes((nds)=>nds.map((node)=>{
                if(node.id !== newNode.id)
                    node.selected=false;
                return node;
            }))
            setEdges((eds)=>eds.map((edge)=>{
                edge.selected = false;
                return edge;
            }))
        }
    }, [tool, setEdges, newEdge, nodes, connectingNodeId])

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
            center = project({x:(reactFlowWrapper.current.clientWidth / 2)-65, 
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
        
        //change selection to just be the new node
        onSelectionChange({
            nodes:[newNoteNode],
            edges:[]
        })
        setNodes((nds)=>nds.map((node)=>{
            if(node.id !== newNoteNode.id)
                node.selected=false;
            return node;
        }))
        setEdges((eds)=>eds.map((edge)=>{
            edge.selected = false;
            return edge;
        }))

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
        });
        editTextRef.current.setPlaceholder('Write to note...');
    }

    const clearEditor = () => {
        setNodeId('');
        editTextRef.current.setPlaceholder('Make a new note...');
        editTextRef.current.editText(undefined);
    }

    const [menu, setMenu] = useState(null)
    const summonMenu = useCallback((type, mouseEvent, data) => {
        // Prevent native context menu from showing
        mouseEvent.preventDefault();
  
        // Calculate position of the context menu. We want to make sure it
        // doesn't get positioned off-screen.
        const pane = reactFlowWrapper.current.getBoundingClientRect();
        const paneBounds = {
            top:   mouseEvent.clientY <  (pane.height - 200) &&   mouseEvent.clientY - 56,
            left:  mouseEvent.clientX <  (pane.width - 200)  &&   mouseEvent.clientX,
            right: mouseEvent.clientX >= (pane.width - 200)  &&   pane.width - mouseEvent.clientX,
            bottom:mouseEvent.clientY >= (pane.height - 200) &&   pane.height - mouseEvent.clientY,
        }
        switch(type) {
            case 'node':
                var sn = [data]
                var titles = {deleteNodes: ''}
                if(selectedNodes.length === 0) {
                    setNodes(nds=>nds.map(node=>{ //select the node
                        if(node.id == data.id)
                            node.selected = true;
                        return node;
                    }))
                    titles.deleteNodes = 'Delete node'
                    setSelectedNodes([data])
                    sn = [data]
                }
                else if (selectedNodes.length === 1) {
                    setNodes(nds=>nds.map(node=>{ //select the node
                        if(node.id == data.id)
                            node.selected = true;
                        else   
                            node.selected = false;
                        return node;
                    }))
                    titles.deleteNodes = 'Delete node'
                    setSelectedNodes([data])
                    sn = [data]
                }
                else {
                    titles.deleteNodes = 'Delete nodes'
                    sn = selectedNodes
                }
                setMenu({
                    type:'node', 
                    node:data,
                    setNodes:setNodes,
                    selectedNodes:sn,
                    titles:titles,
                    ...paneBounds
                })
            break;
            case 'edge':

            break;
            case 'pane':
                setMenu({
                    type: 'pane', 
                    setNodes: setNodes, 
                    mouseEvent:mouseEvent,
                    project:project,
                    getTimeId:getTimeId,
                    tool:tool,
                    ...paneBounds
                })
            break;
            default:
                setMenu(null);
        }
    }, [setMenu, setNodes, selectedNodes, setSelectedNodes])
    const onNodeContextMenu = (mouseEvent, node) => { summonMenu('node', mouseEvent, node) }
    const onEdgeContextMenu = (mouseEvent, edge) => { summonMenu('edge', mouseEvent, edge) }
    const onPaneContextMenu = (mouseEvent) => { summonMenu('pane', mouseEvent, undefined)  }
    // useEffect(()=>{console.log(menu)},[menu])

    //on clicking the background instead of a node or edge
    const onPaneClick = () => {
        setMenu(null);
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
    useEffect(()=>{ //bullshit for in the edge case where two edges are connected to the same node but in opposite directions
        const duplicates = []
        selectedEdges.forEach(selectedEdge=>{
            edges.forEach(e=>{
                if(selectedEdge.source === e.target 
                && selectedEdge.target === e.source)
                {
                    duplicates.push(e)
                }
            })
        })
        setEdges(edges.map(e=>{
            if(duplicates.find(el=>el.id === e.id) !== undefined) {
                e.selected = true;
            }
            return e;
        }))
    }, [selectedEdges])

    const onNodeDoubleClick = (_, node) => {
        let connectedEdges = []
        connectedEdges = edges.filter((edge)=>{
            if(edge.source === node.id
            || edge.target === node.id) {
                setEdges((eds)=>eds.map((ed)=>{
                    if(ed.source === node.id
                    || ed.target === node.id
                    ) {
                        ed.selected=true;
                    }
                    return ed;
                }))
                return edge;
            }
            return;
        })
        setNodes(nds=>nds.map(nd=>{ //edge case when shift clicking, fix thru hack
            if(nd.id === node.id)
                nd.selected=true;
                            return nd;
        }))
        setSelectedEdges(connectedEdges);
    }

    const selectAll = useCallback((event)=>{
        event.preventDefault()

        setNodes(nds=>nds.map(node=>{
            return {...node, selected:true}
        }))
        setEdges(eds=>eds.map(edge=>{
            return {...edge, selected:true}
        }))
        onSelectionChange({nodes: nodes, edges:edges})
    },[nodes, edges, setNodes, setEdges, onSelectionChange])

    const insertEvent = useCallback(()=>{
        const newNote = addNote('');
        changeNoteId(undefined, newNote);
    }, [addNote, changeNoteId])

    const [clipboard, setClipboard] = useState({nodes:[],edges:[]})
    const copy = useCallback(()=>{
        console.log({nodes:selectedNodes, edges:selectedEdges})
        setClipboard({
            nodes:selectedNodes,
            edges:selectedEdges
        })
    }, [selectedNodes, selectedEdges, setClipboard])
    const cut = useCallback(()=>{
        copy()
        console.log(clipboard)
        setNodes(nds=>nds.map(node=>{
            if(selectedNodes.find(nd=>node.id===nd.id) === undefined) return node;
            return null;
        }).filter(e=>e!==null))

        setEdges(eds=>eds.map(edge=>{
            if(selectedEdges.find(ed=>edge.id===ed.id) === undefined) return edge;
            return null;
        }).filter(e=>e!==null))
    }, [copy, setNodes, setEdges, selectedNodes, selectedEdges])
    const paste = useCallback(()=>{
        if(clipboard === undefined) return;
        if(clipboard.nodes === undefined) return;
        if(clipboard.edges === undefined) return;
        if(clipboard.edges.length === 1) { //if there's only one kind of edge selected, pasting it on multiple nodes will attach every node to the last selected node
            let networkedEdges = []
            let PANIC = 0;
            for(let i = 0; i < selectedNodes.length; i++){
                    let newEdge = {
                        ...clipboard.edges[0],
                        id:getTimeId(),
                        source:selectedNodes[i].id,
                        target:nodeId
                    }
                    if(newEdge.source === newEdge.target) continue; //skip if it's the same node

                    while(networkedEdges.filter(edge=>(edge.id === newEdge.id)).length > 0){ //duplicate id resolution
                        console.log('whoops! collision')
                        newEdge.id = getTimeId();
                    }

                    if(edges.filter(edge=>(edge.source === newEdge.source && edge.target === newEdge.target
                                         ||edge.target === newEdge.source && edge.source === newEdge.target
                                         )
                                    ).length === 0) {
                        networkedEdges.push(newEdge)

                    PANIC++;
                    if(PANIC > 500)//OH SHIT WHAT THE FUCK ARE YOU DOING
                                    break;
                }
            }
            setNodes(nds=>nds.map(node=>{return {...node, selected:false}}))
            setEdges(eds=>eds.concat(networkedEdges))
            return;
        }if(clipboard.nodes.length === 0) return; //since it'd be dumb to just copy edges, which won't be visible at all
        console.log({nodes:selectedNodes, edges:selectedEdges})
        
        //sanitization
        var newEdges = []
        // vvv indentation hell, but i don't know how else to make it fit. be thankful i don't make it one giant one-liner, because i totally can.
        let newNodes = clipboard.nodes.map(node=>{
            let newId = getTimeId()
            clipboard.edges.map(edge=>{
                                    if(node.id === edge.source || node.id === edge.target){
                                        if(newEdges.find(e=>e.id === edge.id) !== undefined) return; //edge already exists, skip
                                        edge.id = getTimeId()
                                        if(node.id === edge.source) edge.source = newId;
                                        if(node.id === edge.target) edge.target = newId;
                                        newEdges.push(edge)
                                    }
                                }
                            )
            
            return {
                ...node,
                id:newId,
                position: {
                        x: node.position.x + 15,
                        y: node.position.y + 15,
                    }
                }
            }
        )

        //clear previous selection
        setSelectedNodes(newNodes)
        setSelectedEdges(newEdges)

        //finally, add new nodes
        setNodes(nds=>nds.map(node=>{return {...node, selected:false}}).concat(newNodes))
        setEdges(eds=>eds.map(edge=>{return {...edge, selected:false}}).concat(newEdges))
    }, [setNodes, setEdges, clipboard, edges, selectedNodes, selectedEdges, setSelectedNodes, setSelectedEdges, nodeId])

    useKey(keyBinds.pointer, ()=>setTool('pointer'))
    useKey(keyBinds.line, ()=>setTool('line'))
    useKey(keyBinds.selectAll, (event)=>selectAll(event))
    useKey(keyBinds.addNote, (event)=>insertEvent())
    useKey({key:'c', ctrlKey:true}, ()=>copy())
    useKey({key:'v', ctrlKey:true}, ()=>paste())
    useKey({key:'x', ctrlKey:true}, ()=>cut())
    useKey({key:'`'}, ()=>{console.log({nodes:nodes, edges:edges})})
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
                    connectionLineStyle={{...newEdge.style, ...newEdge.svgWrapperStyle}}
                    // connectionLineWrapperStyle={newEdge.svgWrapperStyle}
                    // connectionLineWrapperStyles={(newEdge.animated)?'animated':''}

                    onPaneClick={onPaneClick}
                    onSelectionChange={onSelectionChange}

                    onNodeContextMenu={onNodeContextMenu}
                    onEdgeContextMenu={onEdgeContextMenu}
                    onPaneContextMenu={onPaneContextMenu}

                    deleteKeyCode={keyBinds.delete}
                    selectionKeyCode={keyBinds.dragSelect}
                    multiSelectionKeyCode={keyBinds.multiSelect}
                    >
                    <Background variant={bgstyle}/>
                    <Controls></Controls>
                    {enableMiniMap && (
                        <MiniMap position='bottom-left' 
                                 pannable
                                 style={{opacity:'50%'}}/>
                    )}
                    {menu && (menu.type === 'pane' && <PaneContext onClick={onPaneClick} {...menu}/>)}
                    {menu && (menu.type === 'node' && <NodeContext onClick={onPaneClick} {...menu}/>)}
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