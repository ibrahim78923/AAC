import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css';
import { ConversationTextEditorPropsI } from './ConversationTextEditor.interface';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
const TextEditor = ({ value, onChange }: ConversationTextEditorPropsI) => {
  const theme = useTheme();
  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
        [{ list: 'bullet' }, { list: 'ordered' }],
        [{ color: [] }],
        ['image'],
        ['imageBlot'],
        // ['link'],

        ['capitalize'],
      ],
    },
  };
  return (
    <Box
      sx={{
        position: 'relative',
        border: `1.5px solid #9CA3AF`,
        borderRadius: '8px',
        overflow: 'hidden',
        '& .ql-toolbar.ql-snow': {
          backgroundColor: theme.palette.grey[100],
          border: 'none',
        },
        '& .ql-container.ql-snow': {
          border: 'none',
          height: '110px',
        },
      }}
    >
      <ReactQuill
        value={value}
        onChange={(newValue) => onChange(newValue)}
        modules={modules}
        style={{ position: 'relative' }}
      />
    </Box>
  );
};

export default TextEditor;
