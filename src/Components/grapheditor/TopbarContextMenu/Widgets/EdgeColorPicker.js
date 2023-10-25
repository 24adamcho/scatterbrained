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

    useEffect(() => {
        transformEdges(setDataList, dataList, (data)=>{
            return {
                ...data,
                style:{
                    stroke:color
                }
            }
        })
    }, [dataList, setDataList, color])

    const onChange = (param)=>{
        setColor(param)
    }

    return (
        <>
            <ColorPickerDropdown 
                color={color} 
                onChange={(param)=>setColor(param)} 
                onReset={()=>setColor(defaultColor)}
            />
        </>
    )
}

export default EdgeColorPicker;