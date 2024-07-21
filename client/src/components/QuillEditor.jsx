import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = () => {
  const [value, setValue] = useState('');
  const toolbarOptions = [
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  ['bold', 'italic', 'underline'],        
  ['image'],
  [{ 'header': 1 }, { 'header': 2 }],               
  [{ 'align': [] }],

  ['clean'] 
  ];
  const modules = {
  toolbar: toolbarOptions
};

console.log(value);

  return (
    <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />
  )
}

export default QuillEditor

