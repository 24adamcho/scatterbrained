import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { transformEdges } from "./utils";

const NewEdgeAnimationToggle = ({
    newEdge,
    setNewEdge
}) => {
    const [boolstate, setBoolstate] = useState(false);
    
    useEffect(()=>{
        if(newEdge.animated !== undefined)
            setBoolstate(newEdge.animated)
    }, [])

    const onClick = () => {
        setBoolstate(!boolstate)
        setNewEdge({
            ...newEdge,
            style:{
                ...newEdge.style,
                animated:!boolstate,
            }
        })
        console.log(newEdge)
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Animated?{boolstate?1:0}</Button>
        </>
    )
}

export default NewEdgeAnimationToggle;