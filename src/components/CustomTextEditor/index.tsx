import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css';
import { CustomTextEditorPropsI } from './CustomTextEditor.interface';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const CustomTextEditor = ({
  value,
  onChange,
  style,
  toolbar,
}: CustomTextEditorPropsI) => {
  const theme: any = useTheme();
  const modules = {
    toolbar: toolbar || {
      container: [
        [
          { size: ['small', false, 'large', 'huge'] },
          { align: [] },
          'color',
          'bold',
          'italic',
          'underline',
          'strike',
          'background',
          { list: 'bullet' },
          { list: 'ordered' },
          'link',
          'image',
          'code-block',
          'blockquote',
        ],
      ],
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        border: `1px solid ${theme?.palette?.grey?.['0']}`,
        borderRadius: '8px',
        overflow: 'hidden',
        '& .ql-toolbar.ql-snow': {
          backgroundColor: theme?.palette?.grey?.[100],
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
        style={{ position: 'relative', ...style }}
      />
    </Box>
  );
};

export default CustomTextEditor;
