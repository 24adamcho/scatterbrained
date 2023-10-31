import { useEffect, useState } from "react";
import { transform, allStylePropertiesSimilar } from "../utils";
import ColorPickerDropdown from "../ColorPickerDropdown";

const EdgeColorPicker = ({
    edges,
    setEdges,
    selectedEdges,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(edges === undefined) return;
        if(selectedEdges === undefined) return;

        if(allStylePropertiesSimilar(edges, selectedEdges, 'stroke')) {
            if(selectedEdges[0].style === undefined)
                setColor(defaultColor)
            else
                setColor(selectedEdges[0].style.stroke)
        }
        else setColor(defaultColor)
    },[selectedEdges])

    const onChange = (param)=>{
        setColor(param)
        transform(setEdges, selectedEdges, (data)=>{
            return {
                ...data,
                style:{
                    ...data.style,
                    stroke:param
                }
            }
        })
    }

    const onReset = () => {
        setColor(defaultColor)
        transform(setEdges, selectedEdges, (edge)=>{
            if(edge.style === undefined) return edge; //if we don't need to delete anything we gucci
            const {stroke: _, ...newStyle} = edge.style
            if(Object.keys(newStyle).length === 0){
                delete edge.style;
                return edge;
            }
            return {...edge, style:newStyle};
        })
    }

    return (
        <>
            <ColorPickerDropdown 
                color={color} 
                onChange={onChange} 
                onReset={()=>onReset()}
            />
        </>
    )
}

export default EdgeColorPicker;