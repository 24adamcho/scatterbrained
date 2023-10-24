import { useCallback, useEffect, useState } from "react";
import { HexColorInput, RgbStringColorPicker } from "react-colorful";
import { transformNodes } from "./utils";

const ColorPicker = ({
    nodes,
    setNodes,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(nodes.length === 1) 
            if(nodes[0].style !== undefined)
                setColor(nodes[0].style.backgroundColor)
        else if(nodes.length > 1) setColor(defaultColor)
    },[nodes])

    const onChange = (param)=>{
        setColor(param)
        transformNodes(setNodes, nodes, (node)=>{
            return {
                ...node,
                style:{
                    backgroundColor:color
                }
            }
        })
    }

    return (
        <>
            <div className="colorPickerPopup">
                <RgbStringColorPicker color={color} onChange={onChange}/>
                <HexColorInput color={color} onChange={onChange}/>
            </div>
        </>
    )
}

export default ColorPicker;