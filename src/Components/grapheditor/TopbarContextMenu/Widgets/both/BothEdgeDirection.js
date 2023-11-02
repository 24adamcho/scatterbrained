import { ButtonGroup, Button } from 'react-bootstrap';
import { transform } from '../utils';
import { useEffect, useState } from 'react';

import { ReactComponent as NoteSvg } from '../../resources/note-sticky-svgrepo-com.svg'
import { ReactComponent as InwardSvg } from '../../resources/arrow-narrow-right-alignment-svgrepo-com.svg'
import { ReactComponent as OutwardSvg } from '../../resources/arrow-narrow-right-move-svgrepo-com.svg'

const BothEdgeDirection = ({
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNodes,
    selectedEdges,
    markHistory,
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
        markHistory()
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
        markHistory()
    }

    return (
        <>
            <ButtonGroup title="Edge Animation Direction">
                <Button 
                    title="Edge animation direction: Inward"
                    onClick={flowInward} 
                    disabled={disable}
                    style={{padding:0}}
                >
                    <InwardSvg style={{width:'35px', height:'35px'}} />
                </Button>
                <NoteSvg style={{width:'35px', height:'35px'}} />
                <Button 
                    title="Edge animation direction: Outward"
                    onClick={flowOutward}
                    disabled={disable}
                    style={{padding:0}}
                >
                    <OutwardSvg style={{width:'35px', height:'35px'}} />
                </Button>
            </ButtonGroup>
        </>
    )
}

export default BothEdgeDirection;