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
            x:left > right ? left : mouseEvent.clientX - 65,
            y:mouseEvent.clientY - 56
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
            <button onClick={()=>newNote()}>Add note</button>
        </div>
    )
}

export default PaneContext