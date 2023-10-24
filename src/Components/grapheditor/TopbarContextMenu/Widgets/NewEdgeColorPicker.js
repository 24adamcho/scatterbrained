import { useEffect, useState } from "react";
import { transformNodes } from "./utils";
import ColorPickerDropdown from "./ColorPickerDropdown";

const NewEdgeColorPicker = ({
    edgeStyle,
    setEdgeStyle,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        console.log(edgeStyle)
        // if(edgeStyle.style !== undefined)
        //         setColor(dataList[0].style.backgroundColor)
        // else setColor(defaultColor)
    },[edgeStyle])

    const onChange = (param)=>{
        setColor(param)
        
    }

    return (
        <>
            <ColorPickerDropdown color={color} onChange={onChange}/>
        </>
    )
}

export default NewEdgeColorPicker;