import { useState, useEffect } from 'react'
import './TopbarContextMenu.css'



const TopbarContextMenu = (
    {
        selectedNodes,
        selectedEdges,
        tool
    }
) => {
    const [selectionType, setSelectionType] = useState('')

    useEffect(()=>{
        console.log(selectedNodes.length)
        console.log(selectedEdges.length)
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
            {
                (tool === 'pointer') ?
                    (selectionType === 'nodes') ?
                        <p>nodesbar</p>
                    :
                    (selectionType === 'edges') ?
                        <p>edgesbar</p>
                    :
                    (selectionType === 'both') ?
                        <p>bothbar</p>
                    :
                    <></> //pointer but nothing selected
                : 
                (tool === 'line') ?
                    <p>linetoolcontextmenu</p>
                :
                <></> //nothing selected or no tool context required
            }
        </>
    )
}

export default TopbarContextMenu;