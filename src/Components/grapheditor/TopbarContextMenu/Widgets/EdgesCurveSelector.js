import { translateEdgeStyleName, transformEdges } from "./utils.js"
import CurveDropdown from "./CurveDropdown.js";

const EdgesCurveSelector = ({
    setEdges,
    edges
}) => {
    const getStyleName = () => {
        if(edges.length < 1) return '';
        else if(edges.length === 1) return `Curve: ${translateEdgeStyleName(edges[edges.length-1].type)}`;
        else if(edges.length > 1) return 'Curve...';
    }

    const onClick = (param) => {
        transformEdges(setEdges,
                       edges,
                       (edge)=>{
                            return {
                               ...edge, 
                               type:param
                            };
        });
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
