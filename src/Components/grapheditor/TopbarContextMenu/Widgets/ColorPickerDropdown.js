import { Button, Dropdown } from "react-bootstrap";
import { RgbStringColorPicker, HexColorInput } from "react-colorful";

import './ColorPickerDropdown.css'

const ColorPickerDropdown = ({
    color,
    onChange,
    onReset
})=>{
    return (
        <>
            <Dropdown autoclose={true}>
                <Dropdown.Toggle className="colorPickerButton">
                    Color picker
                </Dropdown.Toggle>
                <Dropdown.Menu className="colorPickerPopup">
                    <RgbStringColorPicker color={color} onChange={onChange}/>
                    <div className="colorPickerFields">
                        <HexColorInput color={color} onChange={onChange}/>
                        <Button onClick={onReset}>Reset</Button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ColorPickerDropdown;