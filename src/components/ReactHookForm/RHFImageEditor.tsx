import { useFormContext, Controller } from 'react-hook-form';
import { Box, FormHelperText } from '@mui/material';
import CustomLabel from '../CustomLabel';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import 'react-quill/dist/quill.snow.css';
import { indexNumbers } from '@/constants';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default function RHFImageEditor({
  name,
  required,
  disabled,
  style = {},
  modules: customModules = {},
  ...other
}: any) {
  const { control } = useFormContext();
  const theme: any = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const loadQuillModules = async () => {
      if (typeof window !== 'undefined') {
        const QuillModule = await import('react-quill');
        const Quill = QuillModule?.default?.Quill;
        const ImageResizeModule = await import(
          'quill-image-resize-module-react'
        );
        const ImageResize = ImageResizeModule?.default;
        if (Quill && ImageResize) {
          Quill.register('modules/imageResize', ImageResize);
          setIsClient(true);
        }
      }
    };

    loadQuillModules();
  }, []);

  const defaultModules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const modules = { ...defaultModules, ...customModules };

  if (!isClient) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box position="relative">
          {other?.label && (
            <CustomLabel label={other?.label} required={required} />
          )}
          <Box
            sx={{
              position: 'relative',
              minHeight: '200px',
              border: error
                ? `1px solid ${theme?.palette?.error?.main}`
                : `1px solid ${theme?.palette?.grey?.[indexNumbers?.ZERO]}`,
              borderRadius: '8px',
              overflow: 'hidden',
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
            }}
          >
            <ReactQuill
              id={name}
              name={name}
              value={field?.value}
              onChange={field?.onChange}
              modules={modules}
              style={{ position: 'relative', minHeight: '198px', ...style }}
              readOnly={disabled}
              {...other}
            />
          </Box>
          {error && (
            <FormHelperText
              error
              sx={{
                mt: 0,
              }}
            >
              {error?.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
