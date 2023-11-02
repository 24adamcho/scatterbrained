import { memo, useEffect } from 'react';
import {Handle, Position, NodeResizer, NodeResizeControl, useStore} from 'reactflow';
import ReactQuill from 'react-quill'; //for data display

import { ReactComponent as ResizeHandle } from './resize-handle-svgrepo-com.svg'

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
                isVisible={selected && data.tool === 'pointer'}
                shouldResize={()=>{return false;}}
            />
            {selected && data.tool === 'pointer' &&(
                <NodeResizeControl 
                    minWidth={130} 
                    minHeight={100} 
                    position='bottom-right'
                    style={{zIndex:15, 
                            width:'1.25rem', 
                            height:'1.25rem', 
                            transform:'translate(-1.25rem, -1.25rem)'
                    }}
                >
                    <ResizeHandle style={{width:'1.25rem', height:'1.25rem', transform:'translate(0px, -5px)'}}/>
                </NodeResizeControl>
            )}
            <Handle
                position={Position.Top}
                type='target'
                style={(data.tool === 'pointer')? //this really gross chunk is to have the outlines show up when a node is selected when the resizer is hidden
                            handleStyle.pointer 
                            : (selected)? 
                                Object.assign({}, handleStyle.line, {outline:'solid 2px var(--color-alert)'}) 
                                : 
                            handleStyle.line}
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