import { useEffect, useState } from "react";
import { transformNodes } from "./utils";
import ColorPickerDropdown from "./ColorPickerDropdown";

const NewEdgeColorPicker = ({
    newEdge,
    setNewEdge,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(newEdge.style.stroke !== undefined)
            setColor(newEdge.style.stroke)
    },[])

    const onChange = (param)=>{
        setColor(param)
        setNewEdge({
            ...newEdge,
            style:{
                ...newEdge.style,
                stroke:param
            }
        })
    }

    return (
        <>
            <ColorPickerDropdown 
                color={color} 
                onChange={onChange} 
                onReset={()=>onChange(defaultColor)}
            />
        </>
    )
}

export default NewEdgeColorPicker;