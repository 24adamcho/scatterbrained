import React, { useMemo, useState, useCallback, forwardRef } from 'react';

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

    const [newEdgeStyle, setNewEdgeStyle] = useState('default');

    const [nodeId, setNodeId] = useState();
    const [prevNodeId, setPrevNodeId] = useState(); //used for when adding new notes
    
    const onConnect = useCallback((params) => {setEdges((eds) => addEdge({...params, id:getTimeId(), type:newEdgeStyle}, eds)); setEdgeCount(edges.length)}, [setEdges, newEdgeStyle]);
    const getClosestEdge = useCallback((node) => {
      const { nodeInternals } = store.getState();
      const storeNodes = Array.from(nodeInternals.values());
  
      const closestNode = storeNodes.reduce(
        (res, n) => {
          if (n.id !== node.id) {
            const dx = n.positionAbsolute.x - node.positionAbsolute.x;
            const dy = n.positionAbsolute.y - node.positionAbsolute.y;
            const d = Math.sqrt(dx * dx + dy * dy);
  
            if (d < res.distance && d < MIN_DISTANCE) {
              res.distance = d;
              res.node = n;
            }
          }
  
          return res;
        },
        {
          distance: Number.MAX_VALUE,
          node: null,
        }
      );
  
      if (!closestNode.node) {
        return null;
      }
  
      const closeNodeIsSource = closestNode.node.positionAbsolute.x < node.positionAbsolute.x;
  
      // console.log(newEdgeStyle)
      return {
        // id: `${node.id}-${closestNode.node.id}, ${getTimeId()}`,
        id: getTimeId(),
        type: newEdgeStyle,
        source: closeNodeIsSource ? closestNode.node.id : node.id,
        target: closeNodeIsSource ? node.id : closestNode.node.id,
      };
    }, [newEdgeStyle, store]);
    const onNodeDrag = useCallback(
      (_, node) => {
        const closeEdge = getClosestEdge(node);
  
        setEdges((es) => {
            if(es === undefined) return;
          const nextEdges = es.filter((e) => e.className !== 'temp');
  
          if (
            closeEdge &&
            !nextEdges.find((ne) => ne.source === closeEdge.source && ne.target === closeEdge.target)
          ) {
            closeEdge.className = 'temp';
            closeEdge.type = newEdgeStyle;
            nextEdges.push(closeEdge);
          }
  
          return nextEdges;
        });
      },
      [getClosestEdge, setEdges, newEdgeStyle]
    );
    const onNodeDragStop = useCallback(
      (_, node) => {
        const closeEdge = getClosestEdge(node);
  
        setEdges((es) => {
            if(es === undefined) es = [];
          const nextEdges = es.filter((e) => e.className !== 'temp');
  
          if (closeEdge) {
            closeEdge.type = newEdgeStyle;
            nextEdges.push(closeEdge);
          }
  
          return nextEdges;
        });
        setEdgeCount(edges.length)
      },
      [getClosestEdge, setEdges, newEdgeStyle, edges]
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
            data:'',
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
        // console.log(`changed id to ${node.id}`);
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
                <SidebarContextMenu edgeStyle={newEdgeStyle} edgeStyleCallback={setNewEdgeStyle}/>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={onInit}
                    nodeTypes={nodeTypes}
                    onNodeClick={changeNoteId}
                    onNodeDrag={(a, b) => {onNodeDrag(a, b); changeNoteId(a, b);}}
                    onNodeDragStop={onNodeDragStop}
                    onConnect={onConnect}
                    connectionLineType={newEdgeStyle}
                    connectionLineStyle={{stroke:'var(--color-low)', strokeWidth:2}}
                    onNodesDelete={setNodeCount(nodes.length)}
                    onEdgesDelete={setEdgeCount(edges.length)}
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