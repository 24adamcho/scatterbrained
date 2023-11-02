import { Button } from "react-bootstrap";
import { transform } from "../utils";

import { ReactComponent as ReverseSvg } from '../../resources/reverse-svgrepo-com.svg'

const NewEdgeReverse = ({
    newEdge,
    setNewEdge,
}) => {
    const onClick = () => {
        if(newEdge.reversed === undefined) {
            newEdge = {
                ...newEdge,
                reversed:true
            }
        }
        else if (newEdge.reversed === true) {
            const {
                reversed:_,
                ...newEdgeUnreversed
            } = newEdge
            newEdge= newEdgeUnreversed
        }

        setNewEdge(newEdge)
    }

    return (
        <>
            <Button 
                onClick={()=>onClick()}
                disabled={!newEdge.animated}
                title='Reverse animation direction'
                style={{padding:0}} 
            >
                <ReverseSvg style={{width:'35px', height:'35px'}}/>
            </Button>
        </>
    )
}

export default NewEdgeReverse;
