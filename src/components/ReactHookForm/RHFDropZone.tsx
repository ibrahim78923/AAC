import React, { useCallback, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { AttachFileIcon } from '@/assets/icons';
import CustomLabel from '../CustomLabel';
import { FILE_MAX_SIZE } from '@/config';
import { indexNumbers } from '@/constants';

export default function RHFDropZone({
  name,
  required,
  fileName = 'Attach a file',
  fileType = 'PNG, JPG, PDF, DOC, and CSV (max 2.44 MB)',
  accept = {
    'image/png': ['.png', '.PNG'],
    'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
      '.docx',
    ],
    'text/csv': ['.csv'],
  },
  maxSize = FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE,
  multiple = false,
  disabled,
  ...other
}: any) {
  const {
    setValue,
    getValues,
    formState: { errors },
  }: any = useFormContext();
  const theme = useTheme();
  const inputRef: any = useRef(null);

  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      multiple: multiple,
      accept: accept,
      disabled: disabled,
      maxSize: maxSize,
      onDrop: useCallback(
        (files: any) => {
          if (files && files?.length > 0) {
            setValue(name, multiple ? files : files[indexNumbers?.ZERO]);
          }
        },
        [setValue, name, multiple],
      ),
    });

  const formatFileSize = (sizeInBytes: any) => {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB?.toFixed(2.44) + ' MB';
  };

  const handleClick = () => {
    if (inputRef?.current) {
      inputRef.current.value = '';
      setValue(name, null);
    }
  };

  return (
    <>
      {other?.label && <CustomLabel label={other?.label} required={required} />}
      <Box
        {...getRootProps({ onClick: handleClick })}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} ref={inputRef} />

        {!!getValues(name) &&
        (multiple ? getValues(name)?.length > 0 : !!getValues(name)?.name) ? (
          <Box>
            {multiple ? (
              acceptedFiles?.map((file: any, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <Typography variant="body2" key={index}>
                  {file?.name}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">
                {acceptedFiles?.[0]?.name || getValues(name)?.name}
              </Typography>
            )}
          </Box>
        ) : (
          <Box>
            <AttachFileIcon />
            <Typography variant="body1" fontWeight={'bold'}>
              {fileName}
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
              {fileType}
            </Typography>
          </Box>
        )}
      </Box>
      {!!errors[name] && (!multiple || !!!getValues(name)?.length) && (
        <Typography color="error">{errors[name]?.message}</Typography>
      )}
      {!!fileRejections?.length &&
        fileRejections?.map((fileError: any, index: any) => (
          <Typography
            variant="body2"
            color="error"
            key={fileError?.errors?.[index]?.code}
          >
            {fileError?.errors?.[0]?.code === 'file-too-large'
              ? `File size should be less than ${formatFileSize(maxSize)}`
              : `${fileError?.errors?.[0]?.message}`}
            <br />
            {fileError?.errors?.[1]?.code === 'file-too-large'
              ? `File size should be less than ${formatFileSize(maxSize)}`
              : !!fileError?.errors?.[1]?.message &&
                `${fileError?.errors?.[1]?.message}`}
          </Typography>
        ))}
    </>
  );
}
