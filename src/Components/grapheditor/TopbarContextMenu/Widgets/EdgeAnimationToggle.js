import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { transformEdges } from "./utils";

const EdgeAnimationToggle = ({
    edges,
    setEdges,
    selectedEdges,
}) => {
    const [boolstate, setBoolstate] = useState(false);
    
    //this is a gobbeldeygook mess but after fixing like 14 panic attacks in the
    //console this one seems stable and magically exactly what i want
    useEffect(()=>{
        if(selectedEdges === undefined) return;
        if(selectedEdges.length === 1) 
            if(selectedEdges[0].animated !== undefined)
                setBoolstate(selectedEdges[0].animated);
        else if(selectedEdges.length > 1) setBoolstate(false);
    }, [selectedEdges])

    const onClick = () => {
        setBoolstate(!boolstate)
        transformEdges(setEdges, selectedEdges, (data)=>{
            return {
                ...data,
                animated:!boolstate,
            }
        })
        console.log(edges);
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Animated?{boolstate?1:0}</Button>
        </>
    )
}

export default EdgeAnimationToggle;