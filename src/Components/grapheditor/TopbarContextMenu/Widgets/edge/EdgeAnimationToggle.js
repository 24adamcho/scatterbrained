import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { allDataSimilar, transform, findById } from "../utils";

const EdgeAnimationToggle = ({
    edges,
    setEdges,
    selectedEdges,
}) => {
    const [boolstate, setBoolstate] = useState(false);
    const [title, setTitle] = useState('')

    useEffect(()=>{
        if(edges === undefined) return;
        if(selectedEdges === undefined) return;

        if(allDataSimilar(edges, selectedEdges, 'animated')) {
            if(findById(edges, selectedEdges[0].id).animated === undefined)
                { setTitle('nah'); setBoolstate(false)}
            else
                { setTitle('yeah'); setBoolstate(true)}
        }
        else { setTitle('maybe'); setBoolstate(false)}
    }, [edges, selectedEdges])

    const onClick = () => {
        transform(setEdges, selectedEdges, (data)=>{
            return {
                ...data,
                animated:(!boolstate)?!boolstate:undefined,
            }
        })
        setBoolstate(!boolstate)
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Animated?{title}</Button>
        </>
    )
}

export default EdgeAnimationToggle;