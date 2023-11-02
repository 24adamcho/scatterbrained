import { useState, useEffect } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

import { ReactComponent as StraightSvg } from '../resources/straightType.svg'
import { ReactComponent as BezierSvg } from '../resources/bezierType.svg'
import { ReactComponent as SteppedSvg } from '../resources/steppedType.svg'

const CurveDropdown = ({
    title,
    onClickCallback,
    type
})=>{
    const [SvgElement, setSvgElement] = useState(StraightSvg);
    useEffect(()=>{
        switch(type) {
            case 'straight': setSvgElement(StraightSvg); break;
            case 'default' : setSvgElement(BezierSvg);   break;
            case 'step'    : setSvgElement(SteppedSvg);  break;
            default:         setSvgElement(StraightSvg);
        }
    }, [type])

    return (
        <>
            <Dropdown title={title}>
                <Dropdown.Toggle
                    id="bg-vertical-dropdown-1"
                    style={{padding:0, height:'100%'}}
                >
                    {<SvgElement style={{width:35, height:35}}/>}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as='button' onClick={()=>onClickCallback('straight')}>Straight</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClickCallback('default')}>Bezier</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={()=>onClickCallback('step')}>Stepped</Dropdown.Item>
                </Dropdown.Menu>
                {/* <Dropdown.Item as='button' onClick={()=>onClickCallback('smoothstep')}>Smooth Stepped</Dropdown.Item> */}
            </Dropdown>
        </>
    )
}

export { CurveDropdown, StraightSvg, BezierSvg, SteppedSvg };