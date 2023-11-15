import { Button, Dropdown } from "react-bootstrap";
import { RgbStringColorPicker, HexColorInput } from "react-colorful";

import { useEffect, useState } from "react";

import './ColorPickerDropdown.css'

const ColorPickerDropdown = ({
    color,
    onChange,
    onReset,
    onToggle
})=>{
    const [hexColor, setHexColor] = useState('#000000')    

    //a bunch of these are magic bullshit functions
    //see FelipeC's answer to https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function rgbToHex(r, g, b) {
        if(r === undefined || r === null) return '#000000';
        if(g === undefined || g === null) return '#000000';
        if(b === undefined || b === null) return '#000000';

        const rgb = (r << 16) | (g << 8) | (b << 0);
        if(rgb === undefined || rgb === null) return '#000000';

        return '#' + (0x1000000 + rgb).toString(16).slice(1);
    }

    function hexToRgb(hex) {      
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    //and RajeshP's answer to https://stackoverflow.com/questions/42827884/split-a-number-from-a-string-in-javascript
    //this function is to assign hexColorInput's text after a change, converting rgb(r,g,b) to hex
    useEffect(()=>{
        if(color === undefined) return;
        var s = color.match(/\d+/g);
        if(s === undefined) return;
        setHexColor(rgbToHex(s[0], s[1], s[2]))
    },[color])

    //and this one to change color to the new hex input, converted to rgb(r,g,b) format
    function hexChangeColor(hex) {
        var rgb = hexToRgb(hex);
        var str = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        onChange(str);
    }
    
    return (
        <>
            <Dropdown autoclose="true" onToggle={onToggle}>
                <Dropdown.Toggle className="colorPickerButton" 
                                 style={{
                                    display:'flex', 
                                    flexDirection:'row', 
                                    height:'36px'
                                 }}
                                 title="Color"
                >
                    <div style={{
                        width:'1rem', 
                        height:'1rem', 
                        backgroundColor:color, 
                        border:'solid 2px var(--color-low)', 
                        flex:'left',
                        transform:'translate(0.25rem, 0.25rem)',
                        padding:'4px'
                        }}
                    />
                </Dropdown.Toggle>
                <Dropdown.Menu className="colorPickerPopup">
                    <span style={{color:'var(--color-low)', textShadow:'1px 1px var(--color-mid)'}}>
                        <b>Color picker</b>
                    </span>
                    <RgbStringColorPicker color={color} onChange={onChange}/>
                    <div className="colorPickerFields">
                        <HexColorInput color={hexColor} onChange={hexChangeColor} prefixed={true}/>
                        <Button onClick={onReset}>Reset</Button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ColorPickerDropdown;