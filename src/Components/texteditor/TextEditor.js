import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import 'quill-paste-smart';
import './TextEditor.css';
import 'react-quill/dist/quill.snow.css';

class Counter {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    quill.on('text-change', this.update.bind(this));
    this.update();  // Account for initial contents
  }

  calculate(type) {
    let text = this.quill.getText().trim();
    if (type === 'word') {
      text = text.trim();
      // Splitting empty text returns a non-empty array
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }

  update() {
    var length = this.calculate('chars');
    this.options.char(length);
    length = this.calculate('word');
    this.options.word(length);
  }
}
ReactQuill.Quill.register('modules/counter', Counter);

const TextEditor = React.forwardRef((
    {
        initvalue, 
        editNodeRef,
        setCharCount,
        setWordCount
    },
    ref
    ) => {

    const modules = {
        counter: {
            char: setCharCount,
            word: setWordCount
        },
        clipboard: {
          allowed: {
            attributes: [ //allowed pastable attributes
              'bold', 
              'italic', 
              'underline', 
              'strike'
            ]
          },
        },
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

    const [value, setValue] = useState(initvalue);
    const [placeholder, setPlaceholder] = useState('Make a new note...')
    const quillRef = useRef(null)

    //SPAGHETTI MONSTERS; DO NOT TOUCH
    useEffect(()=> {
            editNodeRef.current.editNote(value);
    }, [value, editNodeRef]);

    useEffect(()=>{
      quillRef.current.getEditor().root.dataset.placeholder = placeholder
    }, [placeholder])
    
    //MORE SPAGHETTI
    React.useImperativeHandle(ref, () => ({
        editText: (data) => {
            setValue(data);
        },
        setPlaceholder: (data) => {
            setPlaceholder(data);
        }
    }));

    return (
        <ReactQuill 
            modules={modules} 
            placeholder={placeholder}
            value={value} 
            onChange={setValue}
            ref={quillRef}
        />
    );
})

export default TextEditor;