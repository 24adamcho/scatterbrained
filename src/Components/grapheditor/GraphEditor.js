import { Component, useState} from 'react';

import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import './GraphEditor.css'

function GraphEditor(props){
    const [bgstyle, setBgstyle] = useState('cross');

    return (
        <>
            <div style={{height:'100%'}}>
                <ReactFlow>
                    <Background variant={bgstyle}/>
                    <Controls></Controls>
                </ReactFlow>
            </div>
        </>
    )
}

export default GraphEditor;