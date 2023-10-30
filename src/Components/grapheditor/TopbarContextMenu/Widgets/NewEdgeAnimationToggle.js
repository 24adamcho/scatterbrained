import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { transform } from "./utils";
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

    useEffect(()=>{
        if(newEdge.reversed === undefined) 
            setNewEdge({
                ...newEdge,
                svgWrapperStyle:(boolstate)?{
                    ...newEdge.svgWrapperStyle,
                    vectorEffect:'non-scaling-stroke',
                    strokeDasharray:'5',
                    animation:'dashdraw 0.5s linear infinite'
                }:undefined
            })
        else
            setNewEdge({
                ...newEdge,
                svgWrapperStyle:(boolstate)?{
                    ...newEdge.svgWrapperStyle,
                    vectorEffect:'non-scaling-stroke',
                    strokeDasharray:'5',
                    animation:'reversed-dashdraw 0.5s linear infinite'
                }:undefined
            })
    }, [setNewEdge, newEdge.reversed, newEdge.animated, boolstate])

    const onClick = () => {
        setBoolstate(!boolstate)
        setNewEdge({
            ...newEdge,
            animated:(!boolstate)?!boolstate:undefined,
        })
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Animated?{boolstate?1:0}</Button>
        </>
    )
}

export default NewEdgeAnimationToggle;