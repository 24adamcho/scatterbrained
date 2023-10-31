import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'
import NewEdgeCurveSelector from './Widgets/NewEdgeCurveSelector'
import EdgesCurveSelector from './Widgets/EdgesCurveSelector'
import NodeColorPicker from './Widgets/NodeColorPicker'
import NewEdgeColorPicker from './Widgets/NewEdgeColorPicker'
import EdgeColorPicker from './Widgets/EdgeColorPicker'
import EdgeAnimationToggle from './Widgets/EdgeAnimationToggle'
import NewEdgeAnimationToggle from './Widgets/NewEdgeAnimationToggle'
import NewEdgeReverse from './Widgets/NewEdgeReverse'
import EdgesReverse from './Widgets/EdgesReverse'
import NewEdgesReset from './Widgets/NewEdgesReset'
import EdgesReset from './Widgets/EdgesReset'

const NodesBar = ({
    className,
    selectedNodes,
    setNodes,
    nodes,
}) => {
    
    return (
        <>
            <div className={className}>
                <NodeColorPicker
                    selectedNodes={selectedNodes}
                    setNodes={setNodes}
                    nodes={nodes}
                    defaultColor={window.getComputedStyle(
                                    document.getElementById('App')
                                  ).getPropertyValue('--color-high')}
                />
            </div>
        </>
    )
}

const EdgesBar = ({
    className,
    edges,
    setEdges,
    selectedEdges,
}) => {
    return (
        <>
            <div className={className}>
                <EdgesCurveSelector
                    edges={edges}
                    setEdges={setEdges}
                    selectedEdges={selectedEdges}
                />
                <EdgeColorPicker
                    selectedEdges={selectedEdges}
                    setEdges={setEdges}
                    defaultColor={window.getComputedStyle(
                                    document.getElementById('App')
                                  ).getPropertyValue('--color-low')}
                />
                <EdgeAnimationToggle
                    edges={edges}
                    setEdges={setEdges}
                    selectedEdges={selectedEdges}
                />
                <EdgesReverse
                    selectedEdges={selectedEdges}
                    setEdges={setEdges}
                    edges={edges}
                />
                <EdgesReset
                    selectedEdges={selectedEdges}
                    setEdges={setEdges}
                />
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
    newEdge,
    setNewEdge,
}) => {
    return (
        <>
            <div className={className}>
                <NewEdgeCurveSelector
                    newEdge={newEdge}
                    setNewEdge={setNewEdge}
                />
                <NewEdgeColorPicker 
                    newEdge={newEdge}
                    setNewEdge={setNewEdge}
                    defaultColor={window.getComputedStyle(
                                    document.getElementById('App')
                                  ).getPropertyValue('--color-low-trans')
                    }
                />
                <NewEdgeAnimationToggle
                    newEdge={newEdge}
                    setNewEdge={setNewEdge}
                />
                <NewEdgeReverse
                    newEdge={newEdge}
                    setNewEdge={setNewEdge}
                />
                <NewEdgesReset
                    setNewEdge={setNewEdge}
                />
            </div>
        </>
    )
}

const TopbarContextMenu = (
    {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedNodes,
        selectedEdges,
        tool,
        newEdge,
        setNewEdge,
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
            <div className='topbarContextMenu'>
                {
                    (tool === 'pointer') ?
                        (selectionType === 'nodes') ?
                            <NodesBar className={['nodesBar', 'topBarWidgetsMenu'].join(' ')} 
                                selectedNodes={selectedNodes}
                                      setNodes={setNodes}
                                      nodes={nodes}
                            />
                        :
                        (selectionType === 'edges') ?
                            <EdgesBar className={['edgesBar', 'topBarWidgetsMenu'].join(' ')}
                                      edges={edges}
                                      setEdges={setEdges}
                                      selectedEdges={selectedEdges}
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
                                     newEdge={newEdge}
                                     setNewEdge={setNewEdge}
                        />
                    :
                    <></> //nothing selected or no tool context required
                }
            </div>
        </>
    )
}

export default TopbarContextMenu;