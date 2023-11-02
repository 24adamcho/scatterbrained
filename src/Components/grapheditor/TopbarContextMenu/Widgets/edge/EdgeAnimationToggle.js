import { Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { allDataSimilar, transform, findById } from "../utils";

import { ReactComponent as StraightSvg } from '../../resources/straightType.svg'
import { ReactComponent as DashedSvg }   from '../../resources/dashedType.svg'
import { ReactComponent as DashedSlashStraightSvg } from '../../resources/solid-slash-dashed.svg'

const EdgeAnimationToggle = ({
    edges,
    setEdges,
    selectedEdges,
    markHistory,
}) => {
    const [boolstate, setBoolstate] = useState(false);
    const [title, setTitle] = useState('')
    const [SvgElement, setSvgElement] = useState(StraightSvg);

    useEffect(()=>{
        if(edges === undefined) return;
        if(selectedEdges === undefined) return;
        
        if(allDataSimilar(edges, selectedEdges, 'animated')) {
            const e = findById(edges, selectedEdges[0].id);
            if(e === undefined) {setTitle('nah'); setBoolstate(false); setSvgElement(StraightSvg); return}

            if(e[0] !== undefined)
                if(e[0].animated === undefined)
                    { setTitle('nah'); setBoolstate(false); setSvgElement(StraightSvg)}
                else
                    { setTitle('yeah'); setBoolstate(true); setSvgElement(DashedSvg)}
            else 
                { setTitle('nah'); setBoolstate(false); setSvgElement(StraightSvg)}
        }
        else { setTitle('maybe'); setBoolstate(false); setSvgElement(DashedSlashStraightSvg)}
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
            <Button onClick={()=>onClick()}
                    title='Toggle animation'
                    style={{padding:0}}
            >
                <SvgElement style={{width:35, height:35}} />
            </Button>
        </>
    )
}

export default EdgeAnimationToggle;