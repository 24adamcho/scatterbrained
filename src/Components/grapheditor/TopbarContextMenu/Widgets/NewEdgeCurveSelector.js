import { translateEdgeStyleName } from "./utils.js"
import CurveDropdown from "./CurveDropdown.js";

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
                title={translateEdgeStyleName(newEdge.type)}
                onClickCallback={onClick}
            />
        </>
    )
}

export default NewEdgeCurveSelector
