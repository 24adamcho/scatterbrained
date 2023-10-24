import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'

const NodesBar = ({
    className,
    nodes,
}) => {

    return (
        <>
            <div className={className}>
            <p>test nodesbar</p>
            </div>
        </>
    )
}

const EdgesBar = ({
    className,
    edges,
}) => {

    return (
        <>
            <div className={className}>
                <p>test edgesbar</p>
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

    const translateEdgeStyleName = () => {
        switch(edgeStyle) {
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

    return (
        <>
            <div className={className}>
                <DropdownButton
                    as={ButtonGroup}
                    title={translateEdgeStyleName()}
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
                            />
                        :
                        (selectionType === 'edges') ?
                            <EdgesBar className={['edgesBar', 'topBarWidgetsMenu'].join(' ')}
                                      edges={selectedEdges}
                                      edgeStyleCallback={edgeStyleCallback}
                                      edgeStyle={edgeStyle}
                            />
                        :
                        (selectionType === 'both') ?
                            <BothBar className={['bothBar', 'topBarWidgetsMenu'].join(' ')}
                                     nodes={selectedNodes}
                                     edges={selectedEdges}
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