import { Button } from "react-bootstrap";
import { transform } from "../utils";

import { ReactComponent as ResetSvg } from '../../resources/reset-svgrepo-com.svg'

const BothReset = ({
    setNodes,
    setEdges,
    selectedNodes,
    selectedEdges,
    markHistory,
}) => {
    const onClick = () => {
        transform(setNodes, selectedNodes, (node) => {
            const {
                style:_,
                ...newNode
            } = node

            if(node.style === undefined) return newNode;
            const {
                backgroundColor:__,
                ...newNodeStyle
            } = node.style

            if(Object.keys(newNodeStyle).length === 0) return newNode;
            return {...newNode, style:newNodeStyle}
        })
        transform(setEdges, selectedEdges, (edge) => {
            const {
                animated:_,
                style:__,
                ...newEdge
            } = edge

            if(edge.style === undefined) return newEdge;
            const {
                stroke:___,
                ...newEdgeStyle
            } = edge.style

            if(Object.keys(newEdgeStyle).length === 0) return newEdge;
            return {...newEdge, style:newEdgeStyle}
        })
        markHistory()
    }

    return (
        <>
            <Button onClick={onClick} style={{padding:0}} title='Reset line and node styles'>
                <ResetSvg style={{height:'35px', width:'35px'}}/>
            </Button>
        </>
    )
}

export default BothReset;
