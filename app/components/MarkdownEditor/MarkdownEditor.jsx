import React, {useState} from 'react';
import * as ReactDOM from 'react-dom';
import { useFormik } from "formik"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


// https://www.npmjs.com/package/react-markdown-editor-lite - package used
const MarkdownEditor = ({value, handleChange}) => {
    const [editorValue, setEditorValue] = useState(value); 

    const mdParser = new MarkdownIt();

    function handleEditorChange({ html, text}) {
        setEditorValue(text); 
        if (handleChange) {
            handleChange(editorValue);
        }
    }

  return (
    <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={editorValue}/>
  );
};

export default MarkdownEditor