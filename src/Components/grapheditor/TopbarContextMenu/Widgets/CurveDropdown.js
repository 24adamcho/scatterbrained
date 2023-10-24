import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

const CurveDropdown = ({
    title,
    onClickCallback,
})=>{
    return (
        <>
        <DropdownButton
                as={ButtonGroup}
                title={title}
                id="bg-vertical-dropdown-1"
            >
                <Dropdown.Item as='button' onClick={()=>onClickCallback('straight')}>Straight</Dropdown.Item>
                <Dropdown.Item as='button' onClick={()=>onClickCallback('default')}>Bezier</Dropdown.Item>
                <Dropdown.Item as='button' onClick={()=>onClickCallback('step')}>Stepped</Dropdown.Item>
                <Dropdown.Item as='button' onClick={()=>onClickCallback('smoothstep')}>Smooth Stepped</Dropdown.Item>
            </DropdownButton>
        </>
    )
}

export default CurveDropdown;