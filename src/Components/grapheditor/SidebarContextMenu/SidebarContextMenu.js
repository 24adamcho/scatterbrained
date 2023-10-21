import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownButton, ToggleButtonGroup, ToggleButton } from "react-bootstrap"

import "./SidebarContextMenu.css"
import { useState } from "react"

const SidebarContextMenu = (
    {
        edgeStyle,
        edgeStyleCallback,
        setToolCallback
    }
) => {
    const onClick = (arg) => {edgeStyleCallback(arg)}
    return (
        <>
            <div className="sidebarContextMenu">
                <ButtonGroup className="stuff1" aria-label="fuck you" vertical>
                    <ToggleButtonGroup type="radio" name="tools" defaultValue={1} vertical>
                        <ToggleButton id='tbg-tools-pointer' value={1} onClick={()=>setToolCallback('pointer')}>
                            pointer
                        </ToggleButton>
                        <ToggleButton id='tbg-tools-line' value={2} onClick={()=>setToolCallback('line')}>
                            lines
                        </ToggleButton>
                    </ToggleButtonGroup>
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
                </ButtonGroup>
            </div>
        </>
    )
}

export default SidebarContextMenu; 