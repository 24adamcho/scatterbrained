import { useEffect, useState } from "react";
import { transform } from "./utils";
import ColorPickerDropdown from "./ColorPickerDropdown";

const EdgeColorPicker = ({
    selectedEdges,
    setEdges,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(selectedEdges.length === 1) 
            if(selectedEdges[0].style !== undefined)
                if(selectedEdges[0].style.stroke)
                    setColor(selectedEdges[0].style.stroke)
        else if(selectedEdges.length > 1) setColor(defaultColor)
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