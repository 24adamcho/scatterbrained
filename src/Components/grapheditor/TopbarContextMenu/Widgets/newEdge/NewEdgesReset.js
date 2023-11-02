import { Button } from "react-bootstrap"

import { ReactComponent as ResetSvg } from '../../resources/reset-svgrepo-com.svg'

const NewEdgesReset = ({
    setNewEdge,
}) => {
    const onClick = () => {
        setNewEdge({
            type:'straight'
        });
    }

    return (
        <>
            <Button onClick={()=>onClick()} style={{padding:0}} title='Reset new edge style'>
                <ResetSvg style={{height:'35px', width:'35px'}}/>
            </Button>
        </>
    )
}

export default NewEdgesReset;
