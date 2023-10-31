import { Button } from "react-bootstrap"

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
            <Button onClick={()=>onClick()}>Reset Style</Button>
        </>
    )
}

export default NewEdgesReset;
