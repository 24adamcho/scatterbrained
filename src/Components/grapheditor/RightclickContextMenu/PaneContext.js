import { useCallback } from 'react'

import './context-menu.css'

const PaneContext = ({
    top,
    left,
    right,
    bottom,
    setNodes,
    mouseEvent,
    project,
    getTimeId,
    tool,
    ...props
}) => {
    const newNote = ()=>{
        const center = project({
            x:left > right ? mouseEvent.clientX - 67 : mouseEvent.clientX - 67,
            y:top > bottom ? mouseEvent.clientY - 63 : mouseEvent.clientY - 63
        })
        setNodes(nds=>nds.concat([{
            id:getTimeId(),
            type:'note',
            position:center,
            data: {
                content:'',
                tool:tool,
            },
            selected:true
        }]))
    }
    return (
        <div style={{
                top, left, right, bottom
             }}
             className="context-menu"
             {...props}
        >
            <button className="context-menu-button" onClick={()=>newNote()}>Add note</button>
        </div>
    )
}

export default PaneContext