import React, { useCallback, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { AttachFileIcon } from '@/assets/icons';
import CustomLabel from '../CustomLabel';
import { indexNumbers } from '@/constants';
import { FILE_MAX_SIZE, FILE_SIZE_MESSAGES } from '@/config';

export default function RHFDropZone({
  name,
  required,
  fileName = 'Attach a file',
  fileType = 'PNG, JPG, PDF, DOC, and CSV (max 25 MB)',
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

  const onDrop = useCallback(
    (acceptedFiles: any, fileRejections: any) => {
      let totalSize = 0;
      acceptedFiles?.forEach((file: any) => {
        totalSize += file?.size;
      });

      if (totalSize > maxSize) {
        fileRejections?.push({
          file: null,
          errors: [
            {
              code: FILE_SIZE_MESSAGES?.TOTAL_FILE_SIZE,
              message: `Total file size should be less than ${formatFileSize(
                maxSize,
              )}`,
            },
          ],
        });
        return;
      }

      acceptedFiles?.forEach((file: any) => {
        if (file?.size > maxSize) {
          fileRejections?.push({
            file: file,
            errors: [
              {
                code: FILE_SIZE_MESSAGES?.FILE_TOO_LARGE,
                message: `File size should be less than ${formatFileSize(
                  maxSize,
                )}`,
              },
            ],
          });
        }
      });

      if (acceptedFiles?.length > 0) {
        setValue(
          name,
          multiple ? acceptedFiles : acceptedFiles[indexNumbers?.ZERO],
        );
      }
    },
    [setValue, name, multiple, maxSize],
  );

  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      multiple,
      accept,
      disabled,
      maxSize,
      onDrop,
    });

  const formatFileSize = (sizeInBytes: number) => {
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
                // eslint-disable-next-line
                <Typography variant="body2" key={index}>
                  {file?.name}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">
                {acceptedFiles?.[indexNumbers?.ZERO]?.name ||
                  getValues(name)?.name}
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
          // eslint-disable-next-line
          <Typography variant="body2" color="error" key={index}>
            {fileError?.errors?.some(
              (err: any) => err?.code === FILE_SIZE_MESSAGES?.FILE_TOO_LARGE,
            )
              ? `File size should be less than ${formatFileSize(maxSize)}`
              : `${fileError?.errors[indexNumbers?.ZERO]?.message}`}
            {fileError?.errors?.some(
              (err: any) => err.code === FILE_SIZE_MESSAGES?.TOTAL_FILE_SIZE,
            ) &&
              `Total file size should be less than ${formatFileSize(maxSize)}`}
          </Typography>
        ))}
    </>
  );
}
