import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'
import { transformNodes } from './Widgets/utils'
import NewEdgeCurveSelector from './Widgets/NewEdgeCurveSelector'
import EdgesCurveSelector from './Widgets/EdgesCurveSelector'
import ColorPicker from './Widgets/ColorPicker'

const NodesBar = ({
    className,
    nodes,
    setNodes,
}) => {
    
    return (
        <>
            <div className={className}>
                <ColorPicker
                    dataList={nodes}
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
}) => {
    return (
        <>
            <div className={className}>
                <EdgesCurveSelector
                    edges={edges}
                    setEdges={setEdges}
                />
                <ColorPicker
                    dataList={edges}
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
    edgeStyleCallback,
    edgeStyle
}) => {

    return (
        <>
            <div className={className}>
                <NewEdgeCurveSelector
                    edgeStyle={edgeStyle}
                    edgeStyleCallback={edgeStyleCallback}
                />
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
                                      edges={selectedEdges}
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