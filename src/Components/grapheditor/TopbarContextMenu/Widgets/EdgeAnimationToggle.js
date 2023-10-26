import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { allDataSimilar, transform } from "./utils";

const EdgeAnimationToggle = ({
    edges,
    setEdges,
    selectedEdges,
}) => {
    const [boolstate, setBoolstate] = useState(false);
    const [title, setTitle] = useState('')

    //convert currently selected edges into a ternary value
    // 1: all edges selected are animated, set boolstate to true
    // 0: not all edges are animated,      set boolstate to false
    // -1:all edges are not animated,      set boolstate to false
    const getAnimationState = () => {
        if(selectedEdges === undefined) {setBoolstate(false); return -1}
        if(selectedEdges.length < 1)  {setBoolstate(false); return -1}
        else if(selectedEdges.length >= 1) {
            if(allDataSimilar(edges, selectedEdges, 'animated')) {
                if(selectedEdges[0].animated){setBoolstate(true); return 1}                    
            }
            else {setBoolstate(false); return 0}
        }
        {setBoolstate(false); return -1}
    }
    const translateState = (param) => {
        switch(param) {
            case 1: setTitle('yeah');  break;
            case 0: setTitle('maybe'); break;
            case -1:setTitle('nah');   break;
            default:setTitle('???');
        }
    }

    useEffect(()=>{
        translateState(getAnimationState())
    }, [selectedEdges])

    const onClick = () => {
        transform(setEdges, selectedEdges, (data)=>{
            return {
                ...data,
                animated:(!boolstate)?!boolstate:undefined,
            }
        })
        translateState((!boolstate)?1:-1) //this ugly piece of shit is cuz ternary. don't use ternary.
        setBoolstate(!boolstate)
    }

    return (
        <>
            <Button onClick={()=>onClick()}>Animated?{title}</Button>
        </>
    )
}

export default EdgeAnimationToggle;