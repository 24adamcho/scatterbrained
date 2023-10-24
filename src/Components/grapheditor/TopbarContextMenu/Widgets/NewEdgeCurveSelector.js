import { translateEdgeStyleName } from "./utils.js"
import CurveDropdown from "./CurveDropdown.js";

const NewEdgeCurveSelector = ({
    edgeStyleCallback,
    edgeStyle
}) => {    
    const onClick = (param) => {edgeStyleCallback(param)}

    return (
        <>
            <CurveDropdown
                title={translateEdgeStyleName(edgeStyle)}
                onClickCallback={onClick}
            />
        </>
    )
}

export default NewEdgeCurveSelector
