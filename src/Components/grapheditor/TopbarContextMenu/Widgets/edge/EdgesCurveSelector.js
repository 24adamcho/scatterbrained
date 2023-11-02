import { translateEdgeStyleName, transform, getById, allDataSimilar } from "../utils.js"
import { CurveDropdown } from "../CurveDropdown.js";
import { useEffect, useState } from "react";

const EdgesCurveSelector = ({
    edges,
    setEdges,
    selectedEdges,
    markHistory,
}) => {
    const [type, setType] = useState('default')
    const getStyleName = () => {
        if(selectedEdges === undefined) return '';

        if(selectedEdges.length < 1) return '';
        else if(selectedEdges.length >= 1)
            if(allDataSimilar(edges, selectedEdges, 'type')){
                let listOfEdges = edges.filter(e=>e.id===selectedEdges[0].id)
                if(listOfEdges.length > 0) {
                    return `Curve: ${translateEdgeStyleName(listOfEdges[0].type)}`
                }
                else return 'Curve...'
            }
            else
                return 'Curve...'
            
        else return 'Curve...';
    }

    const evalType = () => {
        setType('default')
        if(selectedEdges === undefined) return '';

        if(selectedEdges.length < 1) return '';
        else if(selectedEdges.length >= 1)
            if(allDataSimilar(edges, selectedEdges, 'type')){
                let listOfEdges = edges.filter(e=>e.id===selectedEdges[0].id)
                if(listOfEdges.length > 0) 
                    setType(listOfEdges[0].type)
            }
    }

    const [title, setTitle] = useState(getStyleName())
    useEffect(()=>{
        evalType();
        setTitle(getStyleName());
    }, [selectedEdges])

    const onClick = (param) => {
        transform(setEdges,
                       selectedEdges,
                       (edge)=>{
                            return {
                               ...edge, 
                               type:param
                            };
        });
        setType(param)
        setTitle(`Curve: ${translateEdgeStyleName(param)}`)
        markHistory();
    }

    return (
        <>
            <CurveDropdown
                title={title}
                onClickCallback={onClick}
                type={type}
            />
        </>
    )
}

export default EdgesCurveSelector
