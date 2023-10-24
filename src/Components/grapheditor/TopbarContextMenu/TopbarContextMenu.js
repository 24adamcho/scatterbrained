import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'
import { transformNodes } from './Widgets/utils'
import NewEdgeCurveSelector from './Widgets/NewEdgeCurveSelector'
import EdgesCurveSelector from './Widgets/EdgesCurveSelector'
import NodeColorPicker from './Widgets/NodeColorPicker'
import NewEdgeColorPicker from './Widgets/NewEdgeColorPicker'
import EdgeColorPicker from './Widgets/EdgeColorPicker'

const NodesBar = ({
    className,
    selectedNodes,
    setNodes,
}) => {
    
    return (
        <>
            <div className={className}>
                <NodeColorPicker
                    dataList={selectedNodes}
                    setDataList={setNodes}
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
                    dataList={selectedEdges}
                    setDataList={setEdges}
                    defaultColor={window.getComputedStyle(
                                    document.getElementById('App')
                                  ).getPropertyValue('--color-low')}
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
    setNewEdgeType,
    newEdgeType,
    newEdgeStyle,
    setNewEdgeStyle
}) => {
    return (
        <>
            <div className={className}>
                <NewEdgeCurveSelector
                    edgeStyle={newEdgeType}
                    edgeStyleCallback={setNewEdgeType}
                />
                <NewEdgeColorPicker 
                    newEdgeStyle={newEdgeStyle} 
                    setNewEdgeStyle={setNewEdgeStyle}
                    defaultColor={window.getComputedStyle(
                                    document.getElementById('App')
                                  ).getPropertyValue('--color-low-trans')
                    }
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
        newEdgeType,
        setNewEdgeType,
        newEdgeStyle,
        setNewEdgeStyle,
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
                                      nodes={selectedNodes}
                                      setNodes={setNodes}
                                      setEdges={setEdges}
                            />
                        :
                        (selectionType === 'edges') ?
                            <EdgesBar className={['edgesBar', 'topBarWidgetsMenu'].join(' ')}
                                      selectedEdges={selectedEdges}
                                      edges={edges}
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
                                     newEdgeType={newEdgeType}
                                     setNewEdgeType={setNewEdgeType}
                                     newEdgeStyle={newEdgeStyle}
                                     setNewEdgeStyle={setNewEdgeStyle}
                        />
                    :
                    <></> //nothing selected or no tool context required
                }
            </div>
        </>
    )
}

export default TopbarContextMenu;