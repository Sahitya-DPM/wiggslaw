'use client'

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  height = "400px"
}: RichTextEditorProps) {
  const modules = useMemo(() => ({
    toolbar: [
      // Text formatting
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      
      // Text styling
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      
      // Lists and alignment
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      
      // Links and media
      ['link', 'image', 'video'],
      
      // Code and quotes
      ['blockquote', 'code-block'],
      
      // Clean up
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'script',
    'list', 'bullet', 'indent', 'direction', 'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  return (
    <div className="rich-text-editor">
      <style jsx global>{`
        .rich-text-editor .ql-editor {
          min-height: ${height};
          font-size: 16px;
          line-height: 1.6;
        }
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-radius: 8px 8px 0 0;
        }
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-radius: 0 0 8px 8px;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          font-style: normal;
          color: #999;
        }
        .rich-text-editor .ql-snow .ql-picker {
          color: #333;
        }
        .rich-text-editor .ql-snow .ql-stroke {
          stroke: #333;
        }
        .rich-text-editor .ql-snow .ql-fill {
          fill: #333;
        }
        .rich-text-editor .ql-snow .ql-picker-options {
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .rich-text-editor .ql-snow .ql-picker-item:hover {
          background-color: #f0f0f0;
        }
        .rich-text-editor .ql-snow .ql-picker-item.ql-selected {
          background-color: #007bff;
          color: white;
        }
        .rich-text-editor .ql-snow .ql-tooltip {
          background-color: #333;
          color: white;
          border: none;
          border-radius: 4px;
        }
        .rich-text-editor .ql-snow .ql-tooltip input[type=text] {
          background-color: #555;
          color: white;
          border: 1px solid #777;
          border-radius: 4px;
        }
        .rich-text-editor .ql-snow .ql-tooltip a.ql-preview {
          color: #4fc3f7;
        }
        .rich-text-editor .ql-snow .ql-tooltip a.ql-action {
          color: #4fc3f7;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
