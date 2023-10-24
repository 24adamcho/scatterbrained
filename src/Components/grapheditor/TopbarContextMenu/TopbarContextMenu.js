import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'
import NewEdgeCurveSelector from './Widgets/NewEdgeCurveSelector'
import EdgesCurveSelector from './Widgets/EdgesCurveSelector'

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