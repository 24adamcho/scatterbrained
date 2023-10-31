import { useEffect, useState } from "react";
import { allStylePropertiesSimilar, transform } from "../utils";
import ColorPickerDropdown from "../ColorPickerDropdown";

const NodeColorPicker = ({
    nodes,
    setNodes,
    selectedNodes,
    defaultColor
}) => {
    const [color, setColor] = useState(defaultColor)

    useEffect(() => {
        if(allStylePropertiesSimilar(nodes, selectedNodes, 'backgroundColor'))
            if(selectedNodes[0].style !== undefined)
                if(selectedNodes[0].style.backgroundColor !== undefined)
                        setColor(selectedNodes[0].style.backgroundColor)
                    else
                        setColor(defaultColor)
            else
                setColor(defaultColor)
        else
            setColor(defaultColor)
    },[selectedNodes])

    const onChange = (param)=>{
        setColor(param)
        transform(setNodes, selectedNodes, (data)=>{
            return {
                ...data,
                style:{
                    ...data.style,
                    backgroundColor:param
                }
            }
        })
    }

    const onReset = () => {
        setColor(defaultColor)
        transform(setNodes, selectedNodes, (node)=>{
            if(node.style === undefined) return node; //if we don't need to delete anything we gucci

            const {backgroundColor: _, ...newStyle} = node.style
            if(Object.keys(newStyle).length === 0){
                delete node.style
                return node;
            }
            return {...node, style:newStyle};
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

export default NodeColorPicker;