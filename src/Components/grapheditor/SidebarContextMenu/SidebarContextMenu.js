import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownButton, ToggleButtonGroup, ToggleButton } from "react-bootstrap"

import "./SidebarContextMenu.css"
import { useState, useRef, useEffect } from "react"

function contains(activeElement, HTMLCollection) {
    for(var i = 0; i < HTMLCollection.length; i++)
        if(activeElement == HTMLCollection.item(i))
            return true;
    return false;
}

function useKey(key, cb){
    const callback = useRef(cb);
  
    useEffect(() => {
        callback.current = cb;
    })
  
    useEffect(() => {
        function handle(event){
            const currentElement = document.activeElement;
            if(currentElement === document.body
            || contains(currentElement, document.getElementsByClassName('react-flow__node'))
            || contains(currentElement, document.getElementsByClassName('react-flow__edge'))
            ) {
                if(event.code === key){
                    callback.current(event);
                } else if (key === 'v' && event.key === 'v') {
                    callback.current(event);
                } else if (key === 't' && event.key === 't') {
                    callback.current(event);
                }
            }
        }
          
        document.body.addEventListener('keydown',handle);
        return () => document.body.removeEventListener("keydown",handle);
    },[key])
  }

const SidebarContextMenu = (
    {
        tool,
        setToolCallback
    }
) => {
    useKey('v', ()=>setToolCallback('pointer'))
    useKey('t', ()=>setToolCallback('line'))

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