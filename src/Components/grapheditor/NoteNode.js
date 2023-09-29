import { memo } from 'react';
import {Handle, Position, NodeResizer} from 'reactflow';
import ReactQuill from 'react-quill'; //for data display

import '../texteditor/TextEditor.css'
import 'react-quill/dist/quill.snow.css';

const NoteNode = ({data, selected}) => {
    return (
        <>
            <NodeResizer 
                minWidth={130} 
                minHeight={100} 
                isVisible={selected}
            />
            <Handle
                position={Position.Top}
                isValidConnection={(connection) => connection.source = connection.target}
                onConnect={(params) => console.log('handle pnConnect', params)}

                isConnectable={true}
                isConnectableStart={true}
                isConnectableEnd={true}
            />
            <ReactQuill
                modules={{toolbar:false}}
                value={data}
                placeholder='Empty node.'
                readOnly={true}
                // style={{padding:10}}
            />
        </>
    )
}

export default memo(NoteNode);