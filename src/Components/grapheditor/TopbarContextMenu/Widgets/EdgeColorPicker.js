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
                    ...data.style,
                    stroke:param
                }
            }
        })
    }

    const onReset = () => {
        setColor(defaultColor)
        transformEdges(setDataList, dataList, (edge)=>{
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