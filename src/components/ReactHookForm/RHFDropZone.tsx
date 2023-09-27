import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

export default function RHFDropZone({ name }: any) {
  const { setValue, getValues } = useFormContext();
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
        <Typography variant="body2" color="textSecondary">
          Drag and drop an image here, or click to select one
        </Typography>
      )}
    </Box>
  );
}
