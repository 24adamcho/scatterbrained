import { Button } from "react-bootstrap"
import { transform, hasAtLeastOne } from "./utils"

const EdgesReverse = ({
    selectedEdges,
    setEdges,
    edges
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
            <Button 
                onClick={()=>onClick()}
                disabled={!hasAtLeastOne(edges, selectedEdges, 'animated', true)}
            >Reverse edges</Button>
        </>
    )
}

export default EdgesReverse;