import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownButton, ToggleButtonGroup, ToggleButton } from "react-bootstrap"

import "./SidebarContextMenu.css"
import { useState, useRef, useEffect } from "react"

import { ReactComponent as PointerToolSvg } from './cursor-alt-svgrepo-com.svg'
import { ReactComponent as LineToolSvg } from './scribble-svgrepo-com.svg'

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
                <ButtonGroup className="toolButtonGroup" vertical>
                    <ToggleButtonGroup type="radio" name="tools" defaultValue={'pointer'} value={tool} vertical>
                        <ToggleButton id='tbg-tools-pointer' value={'pointer'} onClick={()=>setToolCallback('pointer')}>
                            <PointerToolSvg style={{width:35, height:35}}/>
                        </ToggleButton>
                        <ToggleButton id='tbg-tools-line' value={'line'} onClick={()=>setToolCallback('line')}>
                            <LineToolSvg style={{width:35, height:35}}/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    
                </ButtonGroup>
            </div>
        </>
    )
}

export default SidebarContextMenu; 