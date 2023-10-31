import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'
import NewEdgeCurveSelector from './Widgets/newEdge/NewEdgeCurveSelector'
import EdgesCurveSelector from './Widgets/edge/EdgesCurveSelector'
import NodeColorPicker from './Widgets/node/NodeColorPicker'
import NewEdgeColorPicker from './Widgets/newEdge/NewEdgeColorPicker'
import EdgeColorPicker from './Widgets/edge/EdgeColorPicker'
import EdgeAnimationToggle from './Widgets/edge/EdgeAnimationToggle'
import NewEdgeAnimationToggle from './Widgets/newEdge/NewEdgeAnimationToggle'
import NewEdgeReverse from './Widgets/newEdge/NewEdgeReverse'
import EdgesReverse from './Widgets/edge/EdgesReverse'
import NewEdgesReset from './Widgets/newEdge/NewEdgesReset'
import EdgesReset from './Widgets/edge/EdgesReset'
import BothColorPicker from './Widgets/both/BothColorPicker'
import BothEdgeDirection from './Widgets/both/BothEdgeDirection'
import BothReset from './Widgets/both/BothReset'

const NodesBar = ({
    className,
    nodes,
    setNodes,
    selectedNodes,
}) => {
    
    return (
        <>
            <div className={className}>
                <NodeColorPicker
                    nodes={nodes}
                    setNodes={setNodes}
                    selectedNodes={selectedNodes}
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
                    edges={edges}
                    setEdges={setEdges}
                    selectedEdges={selectedEdges}
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
    edges,
    setNodes,
    setEdges,
    selectedNodes,
    selectedEdges,
}) => {
    return (
        <>
            <div className={className}>
                <BothColorPicker
                    nodes={nodes}
                    edges={edges}
                    setNodes={setNodes}
                    setEdges={setEdges}
                    selectedNodes={selectedNodes}
                    selectedEdges={selectedEdges}
                />
                <EdgeAnimationToggle
                    edges={edges}
                    setEdges={setEdges}
                    selectedEdges={selectedEdges}
                />
                <BothEdgeDirection
                    nodes={nodes}
                    edges={edges}
                    setNodes={setNodes}
                    setEdges={setEdges}
                    selectedNodes={selectedNodes}
                    selectedEdges={selectedEdges}
                />
                <BothReset
                    setNodes={setNodes}
                    setEdges={setEdges}
                    selectedNodes={selectedNodes}
                    selectedEdges={selectedEdges}
                />
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
                {newEdge.animated && (<NewEdgeReverse
                    newEdge={newEdge}
                    setNewEdge={setNewEdge}
                />)}
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
                                     nodes={nodes}
                                     edges={edges}
                                     setNodes={setNodes}
                                     setEdges={setEdges}
                                     selectedNodes={selectedNodes}
                                     selectedEdges={selectedEdges}
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