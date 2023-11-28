import React, { useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { CsvImportIcon } from '@/assets/icons';

const RHFFileImport = ({ name }: any) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  }: any = useFormContext();
  const theme = useTheme();
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      multiple: false,
      accept: {
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
            <CsvImportIcon />
            <Typography variant="body1" fontWeight={'bold'}>
              CSV File
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
              CSV file here
            </Typography>
          </Box>
        )}
      </Box>
      {!!errors?.[name] && !!!getValues(name)?.name && (
        <Typography variant="body2" color="error">
          {errors?.[name]?.message}
        </Typography>
      )}
      {!!fileRejections?.length &&
        fileRejections?.map((fileError: any, index: any) => (
          <Typography
            variant="body2"
            color="error"
            key={fileError?.code?.[index]}
          >
            {fileError?.errors?.[0]?.message}
            <br />
            {fileError?.errors?.[1]?.message}
          </Typography>
        ))}
    </>
  );
};

export default RHFFileImport;
