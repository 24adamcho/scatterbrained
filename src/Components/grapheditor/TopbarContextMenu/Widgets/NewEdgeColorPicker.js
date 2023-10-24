import { useEffect, useState } from "react";
import { transformNodes } from "./utils";
import ColorPickerDropdown from "./ColorPickerDropdown";

const NewEdgeColorPicker = ({
    newEdgeStyle,
    setNewEdgeStyle,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(newEdgeStyle.backgroundColor !== undefined)
            setColor(newEdgeStyle.backgroundColor)
    },[])

    const onChange = (param)=>{
        setColor(param)
        setNewEdgeStyle({
            ...newEdgeStyle,
            stroke:color
        })
    }

    return (
        <>
            <ColorPickerDropdown color={color} onChange={onChange}/>
        </>
    )
}

export default NewEdgeColorPicker;