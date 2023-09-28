import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css';

interface TextEditorPropsI {
  value: string;
  onChange: (value: string) => void;
}
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
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
        border: `1.5px solid #9CA3AF`,
        borderRadius: '8px',
        overflow: 'hidden',
        '& .ql-toolbar.ql-snow': {
          backgroundColor: theme.palette.grey[100],
          border: 'none',
        },
        '& .ql-container.ql-snow': {
          border: 'none',
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
