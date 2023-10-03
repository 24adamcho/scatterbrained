import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownButton } from "react-bootstrap"

import "./SidebarContextMenu.css"

const SidebarContextMenu = (props) => {
    return (
        <>
            <div className="sidebarContextMenu">
                <ButtonGroup className="stuff1" aria-label="fuck you" vertical>
                    <Button>1</Button>
                    <DropdownButton
                        as={ButtonGroup}
                        title="Line Type"
                        id="bg-vertical-dropdown-1"
                        >
                            <Dropdown.Item eventKey="1" onClick={props.edgeStyleCallback('solid')}>Solid</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={props.edgeStyleCallback('dotted')}>Dotted</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={props.edgeStyleCallback('arrow')}>Arrow</Dropdown.Item>
                        </DropdownButton>
                </ButtonGroup>
            </div>
        </>
    )
}

export default SidebarContextMenu; 