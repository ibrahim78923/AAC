import React from 'react';
// import ReactQuill from 'react-quill';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles

interface TextEditorPropsI {
  value: string;
  onChange: (value: string) => void;
}
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // Disable server-side rendering
});
const TextEditor = ({ value, onChange }: TextEditorPropsI) => {
  const theme = useTheme();

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
        [{ list: 'bullet' }, { list: 'ordered' }],
        [{ color: [] }],
        ['capitalize'],
      ],
    },
  };

  return (
    <Box
      sx={{
        border: `1.5px solid ${theme.palette.grey[100]}`,
        '& .ql-toolbar.ql-snow': {
          backgroundColor: theme.palette.grey[100],
          border: `1.5px solid ${theme.palette.grey[100]}`,
          borderBottom: 'none',
        },
      }}
    >
      <ReactQuill
        value={value}
        onChange={(newValue) => onChange(newValue)}
        modules={modules}
      />
    </Box>
  );
};

export default TextEditor;
