import { useEffect, useState } from "react";
import { transformEdges } from "./utils";
import ColorPickerDropdown from "./ColorPickerDropdown";

const EdgeColorPicker = ({
    dataList,
    setDataList,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(dataList.length === 1) 
            if(dataList[0].style !== undefined)
                if(dataList[0].style.stroke)
                    setColor(dataList[0].style.stroke)
        else if(dataList.length > 1) setColor(defaultColor)
    },[dataList])

    const onChange = (param)=>{
        setColor(param)
        transformEdges(setDataList, dataList, (data)=>{
            return {
                ...data,
                style:{
                    stroke:color
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

export default EdgeColorPicker;