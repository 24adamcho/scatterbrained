import { Dropdown } from "react-bootstrap";
import { RgbStringColorPicker, HexColorInput } from "react-colorful";

const ColorPickerDropdown = ({
    color,
    onChange
})=>{
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className="colorPickerButton">
                    Color picker
                </Dropdown.Toggle>
                <Dropdown.Menu className="colorPickerPopup">
                    <RgbStringColorPicker color={color} onChange={onChange}/>
                    <HexColorInput color={color} onChange={onChange}/>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ColorPickerDropdown;