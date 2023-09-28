import { Component } from "react";
import ReactQuill from "react-quill";
import './TextEditor.css'
import 'react-quill/dist/quill.snow.css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = props;

        var toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
        ];
        this.modules = {
            toolbar: toolbarOptions
        }
    }

    render() {
        return (
            <ReactQuill modules={this.modules}/>
        );
    }
}

export default TextEditor;