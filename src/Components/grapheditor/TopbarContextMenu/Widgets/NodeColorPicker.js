import { useEffect, useState } from "react";
import { transformEdges } from "./utils";
import ColorPickerDropdown from "./ColorPickerDropdown";

const NodeColorPicker = ({
    dataList,
    setDataList,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(dataList.length === 1) 
            if(dataList[0].style !== undefined)
                setColor(dataList[0].style.backgroundColor)
        else if(dataList.length > 1) setColor(defaultColor)
    },[dataList])

    const onChange = (param)=>{
        setColor(param)
        transformEdges(setDataList, dataList, (data)=>{
            return {
                ...data,
                style:{
                    backgroundColor:color
                }
            }
        })
    }

    return (
        <>
            <ColorPickerDropdown color={color} onChange={onChange}/>
        </>
    )
}

export default NodeColorPicker;