import { Button } from "react-bootstrap";
import { transform } from "../utils";

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
            >Reverse edge</Button>
        </>
    )
}

export default NewEdgeReverse;
