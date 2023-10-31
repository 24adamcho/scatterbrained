import { Button } from "react-bootstrap"
import { transform } from "../utils"

const EdgesReset = ({
    setEdges,
    selectedEdges
}) => {
    const onClick = () => {
        transform(setEdges, selectedEdges, (edge)=>{
            return {
                id:edge.id,
                source:edge.source,
                target:edge.target,
                type:'straight',
                selected:true
            }
        });
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Reset Style</Button>
        </>
    )
}

export default EdgesReset;
