import { Button } from "react-bootstrap"
import { transform, hasAtLeastOne } from "../utils"

import { ReactComponent as ReverseSvg } from '../../resources/reverse-svgrepo-com.svg'

const EdgesReverse = ({
    selectedEdges,
    setEdges,
    edges,
    markHistory,
})=>{
    const onClick = () => {
        transform(setEdges, selectedEdges, (edge)=>{
            const temp = edge.source;
            edge.source = edge.target;
            edge.target = temp;
            return edge;
        })
        markHistory();
    }

    return (
        <>
            <Button 
                onClick={()=>onClick()}
                disabled={!hasAtLeastOne(edges, selectedEdges, 'animated', true)}
                title='Reverse animation direction'
                style={{padding:0}} 
            >
                <ReverseSvg style={{width:'35px', height:'35px'}}/>
            </Button>
        </>
    )
}

export default EdgesReverse;