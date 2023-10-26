import { Button } from "react-bootstrap"
import { transform } from "./utils"

const EdgesReverse = ({
    selectedEdges,
    setEdges
})=>{
    const onClick = () => {
        transform(setEdges, selectedEdges, (edge)=>{
            const temp = edge.source;
            edge.source = edge.target;
            edge.target = temp;
            return edge;
        })
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Reverse edges</Button>
        </>
    )
}

export default EdgesReverse;