import React, { useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { AttachFileIcon } from '@/assets/icons';

export default function RHFDropZone({ name }: any) {
  const { setValue, getValues } = useFormContext();
  const theme = useTheme();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: useCallback(
      (files: any) => {
        if (files && files.length > 0) {
          setValue(name, files[0]);
        }
      },
      [setValue, name],
    ),
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />

      {!!getValues(name)?.name ? (
        <Typography variant="body2">
          {acceptedFiles?.[0]?.name || getValues(name)?.name}
        </Typography>
      ) : (
        <Box>
          <AttachFileIcon />
          <Typography variant="body1" fontWeight={'bold'}>
            Attach a file
          </Typography>
          <Typography variant="body2">
            <Typography
              component="span"
              fontSize={12}
              color={theme.palette.primary.main}
            >
              Click to upload{' '}
            </Typography>
            or drag and drop
          </Typography>
          <Typography component="span" fontSize={12}>
            SVG, PNG, JPG or GIF orGIF (max 2.44 MB)
          </Typography>
        </Box>
      )}
    </Box>
  );
}
