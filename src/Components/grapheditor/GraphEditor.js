import { Component } from 'react';
import './GraphEditor.css'

import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function GraphEditor(props){
    return (
        <>
            <div style={{height:'100%'}}>
                <ReactFlow>
                    <Background></Background>
                    <Controls></Controls>
                </ReactFlow>
            </div>
        </>
    )
}

export default GraphEditor;