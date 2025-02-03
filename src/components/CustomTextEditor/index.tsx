import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css';
import { indexNumbers } from '@/constants';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const CustomTextEditor = ({
  value,
  onChange,
  style,
  toolbar,
  ...other
}: any) => {
  const theme: any = useTheme();
  const modules = {
    toolbar: toolbar || {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
      ],
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '200px',
        border: other?.error
          ? `1px solid ${theme?.palette?.error?.main}`
          : `1px solid ${theme?.palette?.grey?.[indexNumbers?.ZERO]}`,
        overflow: 'auto',
        borderRadius: '8px',
        '& .ql-toolbar.ql-snow': {
          backgroundColor: theme?.palette?.grey?.[100],
          border: 'none',
        },
        '& .ql-container.ql-snow': {
          border: 'none',
        },
        '& .ql-editor': {
          minHeight: '151px',
        },
        '& .ql-tooltip': {
          left: 'auto !important',
        },
      }}
    >
      <ReactQuill
        value={value}
        onChange={(newValue) => onChange(newValue)}
        modules={modules}
        style={{ position: 'relative', minHeight: '198px', ...style }}
        {...other}
      />
    </Box>
  );
};

export default CustomTextEditor;
