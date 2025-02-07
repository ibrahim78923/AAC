import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css';
import SkeletonForm from '../Skeletons/SkeletonForm';
import { CustomTextEditorPropsI } from './CustomTextEditor.interface';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <SkeletonForm length={1} />,
});

const CustomTextEditor = (props: CustomTextEditorPropsI) => {
  const {
    value,
    onChange,
    style,
    toolbar,
    readOnly = false,
    viewMode = false,
    ...other
  } = props;
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
        border: !viewMode ? `1px solid ` : `none`,
        borderColor: other?.error ? 'error.main' : 'grey.0',
        overflow: 'auto',
        borderRadius: '8px',
        '& .ql-toolbar.ql-snow': {
          backgroundColor: theme?.palette?.grey?.[100],
          border: 'none',
          display: viewMode ? 'none' : 'block',
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
        onChange={(newValue) => onChange?.(newValue)}
        modules={modules}
        readOnly={readOnly}
        style={{ position: 'relative', minHeight: '198px', ...style }}
        {...other}
      />
    </Box>
  );
};

export default CustomTextEditor;
