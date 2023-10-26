import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { transformEdges } from "./utils";
import './EdgeAnimationKeyframes.css'

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
            animated:(!boolstate)?!boolstate:undefined,
            style:{
                ...newEdge.style,
            },
            svgWrapperStyle:(!boolstate)?{
                vectorEffect:'non-scaling-stroke',
                strokeDasharray:'5',
                animation:'dashdraw 0.5s linear infinite'
            }:undefined
        })
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Animated?{boolstate?1:0}</Button>
        </>
    )
}

export default NewEdgeAnimationToggle;