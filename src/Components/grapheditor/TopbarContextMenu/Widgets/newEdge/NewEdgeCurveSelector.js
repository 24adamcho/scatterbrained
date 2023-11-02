import { translateEdgeStyleName } from "../utils.js"
import { CurveDropdown, StraightSvg, BezierSvg, SteppedSvg } from "../CurveDropdown.js";

const NewEdgeCurveSelector = ({
    newEdge,
    setNewEdge,
}) => {    

    const onClick = (param) => {
        setNewEdge({
            ...newEdge, 
            type:param}
        )
    }

    return (
        <>
            <CurveDropdown
                title={`Curve: ${translateEdgeStyleName(newEdge.type)}`}
                onClickCallback={onClick}
                type={newEdge.type}
            />
        </>
    )
}

export default NewEdgeCurveSelector
