import React, { useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { AttachFileIcon } from '@/assets/icons';

export default function CustomDropZone({ name }: any) {
  const {
    setValue,
    getValues,
    formState: { errors },
  }: any = useFormContext();
  const theme: any = useTheme();
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
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: `1px solid ${theme?.palette?.grey?.['0']}`,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AttachFileIcon />
            <Typography variant="body1" fontWeight={'bold'}>
              Attach media
            </Typography>
          </Box>
        )}
      </Box>
      {!!errors[name] && !!!getValues(name)?.name && (
        <Typography variant="body2" color="error">
          {errors[name]?.message}
        </Typography>
      )}
    </>
  );
}
