import { useState, useCallback, useEffect } from 'react'

import './context-menu.css'

const NodeContext = ({
    top,
    left,
    right,
    bottom,
    node,
    setNodes,
    selectedNodes,
    titles,
    ...props
}) => {

    const deleteNodes = useCallback(()=>{
        setNodes(nds=>nds.map(nd=>{
            if(selectedNodes.some(snd=>(nd.id === snd.id))) 
                return undefined;
            else return nd;
        }).filter(nd=>nd !== undefined))
    },[setNodes, selectedNodes])

    return (
        <div style={{
                top, left, right, bottom
             }}
             className="context-menu"
             {...props}
        >
            <button onClick={()=>deleteNodes()}>{titles.deleteNodes}</button>
        </div>
    )
}

export default NodeContext