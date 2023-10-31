import { ButtonGroup, Button } from 'react-bootstrap';
import { transform } from '../utils';
import { useEffect, useState } from 'react';

const BothEdgeDirection = ({
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNodes,
    selectedEdges,
}) => {
    const [disable, setDisable] = useState(true)

    useEffect(()=>{
        if(selectedNodes.length !== 1) {setDisable(true); return;}
        if(selectedEdges.length === 0) {setDisable(true); return;}
        const output = false;

        //if there are any edges that aren't connected to the selected node, this widget doesn't make sense
        const nd = selectedNodes[0]
        var flag = false;
        selectedEdges.forEach(edge => {
            if(edge.source !== nd.id
            && edge.target !== nd.id
            ) {
                flag = true;
            }
        });
        if(flag) {
            setDisable(true);
            return;
        }

        setDisable(false)
    }, [selectedNodes, selectedEdges])

    const flowInward = () => {
        transform(setEdges, selectedEdges, (edge) => {
            let temp = edge.source;
            if(edge.source === selectedNodes[0].id) {
                edge.source = edge.target;
                edge.target = temp;
            }
            return edge;
        })
    }
    const flowOutward = () => {
        transform(setEdges, selectedEdges, (edge) => {
            let temp = edge.source;
            if(edge.target === selectedNodes[0].id) {
                edge.source = edge.target;
                edge.target = temp;
            }
            return edge;
        })
    }

    return (
        <>
            <ButtonGroup aria-label="Edge Direction">
                Flow edges:
                <Button 
                    onClick={flowInward} 
                    disabled={disable}
                >
                    Inward
                </Button>
                <Button 
                    onClick={flowOutward}
                    disabled={disable}
                >
                    Outward
                </Button>
            </ButtonGroup>
        </>
    )
}

export default BothEdgeDirection;