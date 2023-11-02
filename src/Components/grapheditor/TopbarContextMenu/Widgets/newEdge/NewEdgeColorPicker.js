import { useEffect, useState } from "react";
import ColorPickerDropdown from "../ColorPickerDropdown";

const NewEdgeColorPicker = ({
    newEdge,
    setNewEdge,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(newEdge.style !== undefined)
            if(newEdge.style.stroke !== undefined)
                setColor(newEdge.style.stroke)
            else setColor(defaultColor)
        else setColor(defaultColor)
    },[newEdge])

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
    
    const onReset = () => {
        setColor(defaultColor)
        if(newEdge.style !== undefined) {
            const {stroke: _, ...newStyle} = newEdge.style
            setNewEdge({
                ...newEdge,
                style:newStyle
            })
            if(Object.keys(newEdge.style).length === 0)
                setNewEdge({style:_, ...newEdge})
        }
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

export default NewEdgeColorPicker;