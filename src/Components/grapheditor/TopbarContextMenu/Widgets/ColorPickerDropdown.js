import { Button, Dropdown } from "react-bootstrap";
import { RgbStringColorPicker, HexColorInput } from "react-colorful";

import './ColorPickerDropdown.css'

const ColorPickerDropdown = ({
    color,
    onChange,
    onReset,
    onToggle
})=>{
    return (
        <>
            <Dropdown autoclose="true" onToggle={onToggle}>
                <Dropdown.Toggle className="colorPickerButton" 
                                 style={{
                                    display:'flex', 
                                    flexDirection:'row', 
                                    height:'100%'
                                 }}
                >
                    Color:
                    <div style={{
                        width:'1rem', 
                        height:'1rem', 
                        backgroundColor:color, 
                        border:'solid 2px var(--color-low)', 
                        flex:'left',
                        transform:'translate(0.25rem, 0.25rem)'
                        }}
                    />
                </Dropdown.Toggle>
                <Dropdown.Menu className="colorPickerPopup">
                    <span style={{color:'var(--color-low)', textShadow:'1px 1px var(--color-mid)'}}>
                        <b>Color picker</b>
                    </span>
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