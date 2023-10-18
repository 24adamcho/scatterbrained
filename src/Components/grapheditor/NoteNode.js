import { memo } from 'react';
import {Handle, Position, NodeResizer, useStore} from 'reactflow';
import ReactQuill from 'react-quill'; //for data display

import '../texteditor/TextEditor.css'
import 'react-quill/dist/quill.snow.css';

const connectionNodeIdSelector = (state) => state.connectionNodeId;

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
            />
            {!isConnecting && (
                <Handle
                    position={Position.Top}
                    type='source'
                />
            )}
            <ReactQuill
                modules={{toolbar:false}}
                value={data}
                placeholder='Empty note.'
                readOnly={true}
                // style={{padding:10}}
            />
        </>
    )
}

export default memo(NoteNode);