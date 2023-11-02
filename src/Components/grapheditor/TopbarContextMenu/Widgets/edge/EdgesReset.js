import { Button } from "react-bootstrap"
import { transform } from "../utils"

import { ReactComponent as ResetSvg } from '../../resources/reset-svgrepo-com.svg'

const EdgesReset = ({
    setEdges,
    selectedEdges,
    markHistory,
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
        markHistory();
    }

    return (
        <>
            <Button onClick={()=>onClick()} style={{padding:0}} title='Reset edge styles'>
                <ResetSvg style={{height:'35px', width:'35px'}}/>
            </Button>
        </>
    )
}

export default EdgesReset;
