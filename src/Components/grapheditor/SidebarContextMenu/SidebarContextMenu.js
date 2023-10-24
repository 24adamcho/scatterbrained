import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownButton, ToggleButtonGroup, ToggleButton } from "react-bootstrap"

import "./SidebarContextMenu.css"
import { useState } from "react"

const SidebarContextMenu = (
    {
        setToolCallback
    }
) => {
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
                    
                </ButtonGroup>
            </div>
        </>
    )
}

export default SidebarContextMenu; 