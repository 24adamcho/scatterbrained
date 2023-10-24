import { useCallback, useEffect, useState } from "react";
import { HexColorInput, RgbStringColorPicker } from "react-colorful";
import { Dropdown } from "react-bootstrap";
import { transformNodes } from "./utils";

const ColorPicker = ({
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
        transformNodes(setDataList, dataList, (data)=>{
            return {
                ...data,
                style:{
                    backgroundColor:color,
                    stroke:color
                }
            }
        })
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle>
                    Color picker
                </Dropdown.Toggle>
                <Dropdown.Menu className="colorPickerPopup">
                    <RgbStringColorPicker color={color} onChange={onChange}/>
                    <HexColorInput color={color} onChange={onChange}/>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ColorPicker;