import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { transform } from "../utils";
import './EdgeAnimationKeyframes.css'

import { ReactComponent as StraightSvg } from '../../resources/straightType.svg'
import { ReactComponent as DashedSvg }   from '../../resources/dashedType.svg'
// import { ReactComponent as DashedSlashStraightSvg } from '../../resources/solid-slash-dashed.svg'

const NewEdgeAnimationToggle = ({
    newEdge,
    setNewEdge
}) => {
    const [boolstate, setBoolstate] = useState(false);
    
    useEffect(()=>{
        if(newEdge.animated !== undefined)
            setBoolstate(newEdge.animated)
        else
            setBoolstate(false)
    }, [newEdge.animated])

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
            <Button onClick={()=>onClick()} 
                    title='Toggle animation'
                    style={{padding:0}}
            >
                {!boolstate? 
                    <StraightSvg style={{width:35, height:35}}/> : 
                    <DashedSvg style={{width:35, height:35}}/>
                }
            </Button>
        </>
    )
}

export default NewEdgeAnimationToggle;