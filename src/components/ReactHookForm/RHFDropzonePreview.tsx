import { useCallback, useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CustomLabel from '../CustomLabel';
import { FILE_MAX_SIZE } from '@/config';
import Image from 'next/image';
import { generateImage } from '@/utils/avatarUtils';
import { ARRAY_INDEX } from '@/constants/strings';

export default function RHFDropzonePreview({
  name,
  required,
  fileName = 'Attach an image',
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
  disabled,
  ...other
}: any) {
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  }: any = useFormContext();
  const theme = useTheme();
  const [file, setFile] = useState(getValues(name) || null);
  const [fileError, setFileError] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: any, fileRejections: any) => {
      if (fileRejections?.length > 0) {
        const sizeError = fileRejections[ARRAY_INDEX?.ZERO]?.errors?.find(
          (err: any) => err?.code === 'file-too-large',
        );
        if (sizeError) {
          setFileError(
            `File size should be less than ${formatFileSize(maxSize)}`,
          );
        }
        return;
      }

      const selectedFile = acceptedFiles?.[ARRAY_INDEX?.ZERO];
      if (selectedFile) {
        setValue(name, selectedFile);
        setFile(selectedFile);
        setFileError('');
      }
    },
    [setValue, name, maxSize],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled,
    maxSize,
    multiple: false,
    onDrop,
  });

  const formatFileSize = (sizeInBytes: number) => {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB?.toFixed(2) + ' MB';
  };

  const handleClick = () => {
    setValue(name, null);
    setFile(null);
    setFileError('');
  };

  useEffect(() => {
    const currentFile = getValues(name);
    if (currentFile) {
      setFile(currentFile);
    }
  }, [getValues, name]);

  useEffect(() => {
    const subscription = watch((value: any) => {
      if (value[name] === null) {
        setFile(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, [watch, name]);

  return (
    <>
      {other?.label && <CustomLabel label={other?.label} required={required} />}
      <Box
        {...getRootProps({ onClick: handleClick })}
        border={1}
        borderColor={'custom.hex_grey'}
        borderRadius={2}
        p={2}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={150}
        sx={{
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <Image
            src={
              file?.preview ||
              generateImage(file?.url) ||
              URL?.createObjectURL(file)
            }
            alt={name}
            width={100}
            height={100}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <Box textAlign={'center'}>
            <AttachFileIcon />
            <Typography variant={'body1'} fontWeight={'bold'}>
              {fileName}
            </Typography>
            <Typography variant={'body2'}>
              <Typography
                component={'span'}
                fontSize={12}
                color={theme?.palette?.primary?.main}
              >
                Click to upload{' '}
              </Typography>
              or drag and drop
            </Typography>
            <Typography component={'span'} fontSize={12}>
              {fileType}
            </Typography>
          </Box>
        )}
      </Box>
      {!!fileError && <Typography color={'error'}>{fileError}</Typography>}
      {!!errors[name] && (
        <Typography color={'error'}>{errors[name]?.message}</Typography>
      )}
    </>
  );
}
