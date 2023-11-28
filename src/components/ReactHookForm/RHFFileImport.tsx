import React, { useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { AttachFileIcon } from '@/assets/icons';

const RHFFileImport = ({ name }: any) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  }: any = useFormContext();
  const theme = useTheme();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/csv': ['.csv'],
    },
    onDrop: useCallback(
      (files: any) => {
        if (files && files?.length > 0) {
          setValue(name, files?.[0]);
        }
      },
      [setValue, name],
    ),
    maxSize: 5 * 1024,
    onError() {},
  });

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
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
                color={theme?.palette?.primary?.main}
              >
                Click to upload{' '}
              </Typography>
              or drag and drop
            </Typography>
            <Typography component="span" fontSize={12}>
              CSV file (max 2.44 MB)
            </Typography>
          </Box>
        )}
      </Box>
      {!!errors?.[name] && !!!getValues(name)?.name && (
        <Typography variant="body2" color="error">
          {errors?.[name]?.message}
        </Typography>
      )}
    </>
  );
};

export default RHFFileImport;
