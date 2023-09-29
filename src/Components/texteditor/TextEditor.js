import { Component, useState } from "react";
import ReactQuill from "react-quill";
import './TextEditor.css'
import 'react-quill/dist/quill.snow.css';

function TextEditor({inputValue, nodeEditCallback}) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': [] }],

            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            ['link', 'image', 'video'],                       // rich media embed
            
            
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],
            
            ['clean']                                         // remove formatting button
        ]
    };
    
    const [value, setValue] = useState(inputValue);

    const changeNodeData = (delta, _, __, editor) => {
        setValue(editor.getContents());
        console.log(`Changing node's data to ${JSON.stringify(value)}`);
        nodeEditCallback(value);
    }
    
    return (
        <ReactQuill modules={modules} placeholder='Make a new note...' value={value} onChange={changeNodeData} /> //useState doesn't like classes
        //<ReactQuill modules={modules} placeholder="Make a new note..." />
    );
}

export default TextEditor;