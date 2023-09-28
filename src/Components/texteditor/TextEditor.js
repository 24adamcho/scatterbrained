import { Component, useState } from "react";
import ReactQuill from "react-quill";
import './TextEditor.css'
import 'react-quill/dist/quill.snow.css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = props;

        var toolbarOptions = [
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
        ];
        this.modules = {
            toolbar: toolbarOptions
        }
    }

    render() {
        const [value, setValue] = useState('');
        return (
            <ReactQuill modules={this.modules} placeholder='Make a new note...' value={value} onChange={setValue} />
        );
    }
}

export default TextEditor;