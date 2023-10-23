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

    const translateEdgeStyleName = () => {
        switch(edgeStyle) {
            case 'default':
                return 'Bezier';
            case 'step':
                return 'Stepped';
            case 'smoothstep':
                return 'Smooth Stepped';
            case 'straight':
                return 'Straight';
            default:
                return '???';
        }
    }
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
                        title={translateEdgeStyleName()}
                        id="bg-vertical-dropdown-1"
                        >
                            <Dropdown.Item as='button' onClick={()=>onClick('straight')}>Straight</Dropdown.Item>
                            <Dropdown.Item as='button' onClick={()=>onClick('default')}>Bezier</Dropdown.Item>
                            <Dropdown.Item as='button' onClick={()=>onClick('step')}>Stepped</Dropdown.Item>
                            <Dropdown.Item as='button' onClick={()=>onClick('smoothstep')}>Smooth Stepped</Dropdown.Item>
                        </DropdownButton>
                </ButtonGroup>
            </div>
        </>
    )
}

export default SidebarContextMenu; 