import { memo, useEffect } from 'react';
import {Handle, Position, NodeResizer, useStore} from 'reactflow';
import ReactQuill from 'react-quill'; //for data display

import '../texteditor/TextEditor.css'
import 'react-quill/dist/quill.snow.css';

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const handleStyle = {
    pointer: {
        width:'8px',
        height:'8px'
    },
    line: {
        width:'100%',
        height:'100%'
    }
}

const NoteNode = ({data, selected}) => {
    const connectionNodeId = useStore(connectionNodeIdSelector);

    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== data.id;

    return (
        <>
            <NodeResizer 
                minWidth={130} 
                minHeight={100} 
                isVisible={selected}
            />
            <Handle
                position={Position.Top}
                type='target'
                style={(data.tool === 'pointer')? handleStyle.pointer : handleStyle.line}
            />
            {!isConnecting && (
                <Handle
                    position={Position.Top}
                    type='source'
                    style={(data.tool === 'pointer')? handleStyle.pointer : handleStyle.line}
                />
            )}
            <ReactQuill
                modules={{toolbar:false}}
                value={data.content}
                placeholder='Empty note.'
                readOnly={true}
                // style={{padding:10}}
            />
        </>
    )
}

export default memo(NoteNode);