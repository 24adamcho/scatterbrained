import { translateEdgeStyleName, transformEdges } from "./utils.js"
import CurveDropdown from "./CurveDropdown.js";

const EdgesCurveSelector = ({
    edges,
    setEdges,
    selectedEdges,
}) => {
    const getStyleName = () => {
        if(selectedEdges === undefined) return '';
        else if(selectedEdges.length < 1) return '';
        else if(selectedEdges.length === 1) return `Curve: ${translateEdgeStyleName(edges[edges.length-1].type)}`;
        else if(selectedEdges.length > 1) return 'Curve...';
    }

    const onClick = (param) => {
        transformEdges(setEdges,
                       selectedEdges,
                       (edge)=>{
                            return {
                               ...edge, 
                               type:param
                            };
        });
        // console.log(translateStyleName(param))
        // console.log(edgeSelection[edgeSelection.length-1])
    }

    return (
        <>
            <CurveDropdown
                title={getStyleName()}
                onClickCallback={onClick}
            />
        </>
    )
}

export default EdgesCurveSelector
