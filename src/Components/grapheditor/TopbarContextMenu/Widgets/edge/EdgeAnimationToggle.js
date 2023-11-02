import { Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { allDataSimilar, transform, findById } from "../utils";

const EdgeAnimationToggle = ({
    edges,
    setEdges,
    selectedEdges,
    markHistory,
}) => {
    const [boolstate, setBoolstate] = useState(false);
    const [title, setTitle] = useState('')

    useEffect(()=>{
        if(edges === undefined) return;
        if(selectedEdges === undefined) return;
        
        if(allDataSimilar(edges, selectedEdges, 'animated')) {
            const e = findById(edges, selectedEdges[0].id)[0];

            if(e !== undefined)
                if(e.animated === undefined)
                    { setTitle('nah'); setBoolstate(false)}
                else
                    { setTitle('yeah'); setBoolstate(true)}
            else 
                { setTitle('nah'); setBoolstate(false)}
        }
        else { setTitle('maybe'); setBoolstate(false)}
    }, [edges, selectedEdges, setBoolstate])

    const onClick = ()=>{
        transform(setEdges, selectedEdges, (data)=>{
            if(!boolstate)
                return {
                    ...data,
                    animated:true
                }
            else {
                const {
                    animated:_,
                    ...temp
                } = data
                return temp;
            }
        })
        setBoolstate(!boolstate)
        markHistory();
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Animated?{title}</Button>
        </>
    )
}

export default EdgeAnimationToggle;