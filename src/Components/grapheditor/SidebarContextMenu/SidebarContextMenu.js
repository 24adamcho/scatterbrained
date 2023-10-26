import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownButton, ToggleButtonGroup, ToggleButton } from "react-bootstrap"

import "./SidebarContextMenu.css"
import { useState, useRef, useEffect } from "react"

const SidebarContextMenu = (
    {
        tool,
        setToolCallback,
        keyBinds
    }
) => {

    return (
        <>
            <div className="sidebarContextMenu">
                <ButtonGroup className="stuff1" aria-label="fuck you" vertical>
                    <ToggleButtonGroup type="radio" name="tools" defaultValue={'pointer'} value={tool} vertical>
                        <ToggleButton id='tbg-tools-pointer' value={'pointer'} onClick={()=>setToolCallback('pointer')}>
                            pointer
                        </ToggleButton>
                        <ToggleButton id='tbg-tools-line' value={'line'} onClick={()=>setToolCallback('line')}>
                            lines
                        </ToggleButton>
                    </ToggleButtonGroup>
                    
                </ButtonGroup>
            </div>
        </>
    )
}

export default SidebarContextMenu; 