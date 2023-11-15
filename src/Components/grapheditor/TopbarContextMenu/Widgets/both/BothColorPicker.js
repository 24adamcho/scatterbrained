import { useState, useEffect } from 'react';
import ColorPickerDropdown from '../ColorPickerDropdown';
import { allStylePropertiesSimilar, transform,  } from '../utils';

const BothColorPicker = ({
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNodes,
    selectedEdges,
    markHistory,
}) => {
    const defaultColor = 'rgb(0,0,0)'
    const [color, setColor] = useState(defaultColor)

    useEffect(()=>{
        if(nodes === undefined) return;
        if(edges === undefined) return;
        if(selectedNodes === undefined) return;
        if(selectedEdges === undefined) return;

        if(allStylePropertiesSimilar(nodes, selectedNodes, 'backgroundColor')
        && allStylePropertiesSimilar(edges, selectedEdges, 'stroke')
        ) {
            if(selectedNodes[0].style === undefined)
                setColor(defaultColor)
            else
                setColor(selectedNodes[0].style.backgroundColor)
        }
        else setColor(defaultColor)
    }, [selectedNodes, selectedEdges])

    const onChange = (param) => {
        setColor(param)
        if(selectedNodes === undefined) return;
        transform(setNodes, selectedNodes, (node) => {
            return {
                ...node,
                style: {
                    ...node.style,
                    backgroundColor:param
                }
            }
        })
        transform(setEdges, selectedEdges, (edge) => {
            return {
                ...edge,
                style: {
                    ...edge.style,
                    stroke:param
                }
            }
        })
    }

    const onReset = () => {
        setColor(defaultColor);
        transform(setNodes, selectedNodes, (node) => {
            if(node.style === undefined) return node;

            const {backgroundColor:_, ...newNodeStyle} = node.style
            if(Object.keys(newNodeStyle).length === 0) {
                delete node.style;
                return node;
            }
            return {
                ...node,
                style: newNodeStyle
            }
        })
        transform(setEdges, selectedEdges, (edge) => {
            if(edge.style === undefined) return edge;

            const {stroke:_, ...newEdgeStyle} = edge.style
            if(Object.keys(newEdgeStyle).length === 0) {
                delete edge.style;
                return edge;
            }
            return {
                ...edge,
                style: newEdgeStyle
            }
        })
        markHistory();
    }
    
    const onToggle = (nextShow, meta) => {
        if(nextShow === false)
            markHistory()
    }

    return (
        <>
            <ColorPickerDropdown
                color={color}
                onChange={onChange}
                onReset={onReset}
                onToggle={onToggle}
            />
        </>
    )
}

export default BothColorPicker;