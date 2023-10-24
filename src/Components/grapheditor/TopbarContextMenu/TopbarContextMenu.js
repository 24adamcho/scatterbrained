import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'

const NodesBar = ({
    className,
    nodes,
    setNodes,
}) => {

    return (
        <>
            <div className={className}>
            <p>test nodesbar</p>
            </div>
        </>
    )
}


const translateEdgeStyleName = (param) => {
    switch(param) {
        case 'default':
            return 'Bezier';
        case 'step':
            return 'Stepped';
        case 'smoothstep':
            return 'Smooth Stepped';
        case 'straight':
            return 'Straight';
        default:
            return '???';
    }
}

const EdgesBar = ({
    className,
    edges,
    setEdges,
}) => {
    const getStyleName = () => {
        if(edges.length === 0) return '';
        else if(edges.length === 1) return `Curve: ${translateEdgeStyleName(edges[edges.length-1].type)}`;
        else if(edges.length > 1) return 'Curve...';
    }

    const onClick = (param) => {
        setEdges((eds)=>{
            return eds.map((edge)=>{
                edges.forEach((selectedEdge)=>{
                    console.log(selectedEdge.id === edge.id)
                    if(selectedEdge.id === edge.id) {
                        edge.type = param;
                        return edge;
                    }
                })
                return edge;
            })
        })
    }

    return (
        <>
            <div className={className}>
                <DropdownButton
                    as={ButtonGroup}
                    title={getStyleName()}
                    id="bg-vertical-dropdown-1"
                >
                    <Dropdown.Item as='button' onClick={()=>onClick('straight')}>Straight</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClick('default')}>Bezier</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClick('step')}>Stepped</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClick('smoothstep')}>Smooth Stepped</Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    )
}

const BothBar = ({
    className,
    nodes,
    edges
}) => {

    return (
        <>
            <div className={className}>
                <p>test bothbar</p>
            </div>
        </>
    )
}

const LineToolBar = ({
    className,
    edgeStyleCallback,
    edgeStyle
}) => {
    const onClick = (arg) => {edgeStyleCallback(arg)}

    return (
        <>
            <div className={className}>
                <DropdownButton
                    as={ButtonGroup}
                    title={translateEdgeStyleName(edgeStyle)}
                    id="bg-vertical-dropdown-1"
                >
                    <Dropdown.Item as='button' onClick={()=>onClick('straight')}>Straight</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClick('default')}>Bezier</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClick('step')}>Stepped</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClick('smoothstep')}>Smooth Stepped</Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    )
}

const TopbarContextMenu = (
    {
        selectedNodes,
        selectedEdges,
        setNodes,
        setEdges,
        tool,
        edgeStyleCallback,
        edgeStyle
    }
) => {
    const [selectionType, setSelectionType] = useState('')

    useEffect(()=>{
        // console.log(selectedNodes.length)
        // console.log(selectedEdges.length)
        if(selectedNodes.length > 0 && selectedEdges.length === 0) {
            setSelectionType('nodes');
        }
        else if(selectedNodes.length === 0 && selectedEdges.length > 0) {
            setSelectionType('edges');
        }
        else if(selectedNodes.length > 0 && selectedEdges.length > 0) {
            setSelectionType('both');
        }
        else if(selectedNodes.length === 0 && selectedEdges.length === 0) {
            setSelectionType('none');
        }
    }, [selectedNodes.length, selectedEdges.length])

    return (
        <>
            <div class='topbarContextMenu'>
                {
                    (tool === 'pointer') ?
                        (selectionType === 'nodes') ?
                            <NodesBar className={['nodesBar', 'topBarWidgetsMenu'].join(' ')} 
                                      nodes={selectedNodes}
                                      setNodes={setNodes}
                                      setEdges={setEdges}
                            />
                        :
                        (selectionType === 'edges') ?
                            <EdgesBar className={['edgesBar', 'topBarWidgetsMenu'].join(' ')}
                                      edges={selectedEdges}
                                      edgeStyleCallback={edgeStyleCallback}
                                      edgeStyle={edgeStyle}
                                      setNodes={setNodes}
                                      setEdges={setEdges}
                            />
                        :
                        (selectionType === 'both') ?
                            <BothBar className={['bothBar', 'topBarWidgetsMenu'].join(' ')}
                                     nodes={selectedNodes}
                                     edges={selectedEdges}
                                     setNodes={setNodes}
                                     setEdges={setEdges}
                            />
                        :
                        <></> //pointer but nothing selected
                    : 
                    (tool === 'line') ?
                        <LineToolBar className={['lineToolBar', 'topBarWidgetsMenu'].join(' ')}
                                     edgeStyleCallback={edgeStyleCallback}
                                     edgeStyle={edgeStyle}
                        />
                    :
                    <></> //nothing selected or no tool context required
                }
            </div>
        </>
    )
}

export default TopbarContextMenu;