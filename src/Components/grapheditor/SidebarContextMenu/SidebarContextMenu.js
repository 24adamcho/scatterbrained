import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownButton, ToggleButtonGroup, ToggleButton } from "react-bootstrap"

import "./SidebarContextMenu.css"

const SidebarContextMenu = (
    {
        edgeStyle,
        edgeStyleCallback
    }
) => {

    const onClick = (arg) => {edgeStyleCallback(arg)}
    return (
        <>
            <div className="sidebarContextMenu">
                <ButtonGroup className="stuff1" aria-label="fuck you" vertical>
                    <Button>1</Button>
                    <DropdownButton
                        as={ButtonGroup}
                        title={edgeStyle}
                        id="bg-vertical-dropdown-1"
                        >
                            <Dropdown.Item as='button' onClick={()=>onClick('default')}>default</Dropdown.Item>
                            <Dropdown.Item as='button' onClick={()=>onClick('step')}>step</Dropdown.Item>
                            <Dropdown.Item as='button' onClick={()=>onClick('smoothstep')}>smoothstep</Dropdown.Item>
                            <Dropdown.Item as='button' onClick={()=>onClick('straight')}>straight</Dropdown.Item>
                        </DropdownButton>
                    {/* <DropdownButton
                        as={ButtonGroup}
                        title={edgeStyle}
                        id='bg-vertical-dropdown-1'
                        >
                            <ToggleButtonGroup type='radio' name='newEdgeCurveOption' defaultValue={1} vertical>
                                <ToggleButton id='tbg-radio-1' value={1} onClick={onClick('default')}>default</ToggleButton>
                                <ToggleButton id='tbg-radio-2' value={2} onClick={onClick('step')}>step</ToggleButton>
                                <ToggleButton id='tbg-radio-3' value={3} onClick={onClick('smoothstep')}>smoothstep</ToggleButton>
                                <ToggleButton id='tbg-radio-4' value={4} onClick={onClick('straight')}>straight</ToggleButton>
                            </ToggleButtonGroup>
                        </DropdownButton> */}
                </ButtonGroup>
            </div>
        </>
    )
}

export default SidebarContextMenu; 