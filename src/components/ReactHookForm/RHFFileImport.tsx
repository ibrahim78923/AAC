import React, { useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { CsvImportIcon } from '@/assets/icons';
import CustomLabel from '../CustomLabel';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { FILE_MAX_SIZE, FILE_SIZE_MESSAGES } from '@/config';
import { maxFileSize } from '@/utils/avatarUtils';

const RHFFileImport = (props: any) => {
  const { required, name, ...other } = props;

  const {
    setValue,
    getValues,
    formState: { errors },
  }: any = useFormContext();

  const onDrop = useCallback(
    (files: any) => {
      if (files && files?.length > SELECTED_ARRAY_LENGTH?.ZERO) {
        setValue(name, files?.[ARRAY_INDEX?.ZERO]);
      }
    },
    [setValue, name],
  );

  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      multiple: false,
      accept: {
        'text/csv': ['.csv'],
      },
      onDrop,
    });

  const fileName = useMemo(() => {
    return acceptedFiles?.[ARRAY_INDEX?.ZERO]?.name || getValues(name)?.name;
  }, [acceptedFiles, getValues(name), name]);

  return (
    <>
      <input type="file" {...getInputProps()} id={name} />
      {other?.label && <CustomLabel label={other?.label} required={required} />}
      <label htmlFor={name}>
        <Box
          {...getRootProps()}
          onClick={undefined}
          sx={{
            border: `1px solid `,
            borderColor: 'custom.off_white_three',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {!!fileName ? (
            <Typography variant="body2" color={'slateBlue.main'}>
              {fileName}
            </Typography>
          ) : (
            <>
              <CsvImportIcon />
              <Typography variant="body1" fontWeight={'fontWeightBold'}>
                CSV File
              </Typography>
              <Typography variant="body2" sx={{ my: 0.5 }}>
                <Typography component="span" variant="body2" color="primary">
                  Click to upload{' '}
                </Typography>
                or drag and drop
              </Typography>
              <Typography variant="body3">CSV file here</Typography>
            </>
          )}
        </Box>
      </label>

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
            sx={{ wordBreak: 'break-all' }}
          >
            {fileError?.errors?.some(
              (err: any) => err?.code === FILE_SIZE_MESSAGES?.FILE_TOO_LARGE,
            )
              ? `File size should be less than ${maxFileSize(
                  FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE,
                )}`
              : `${fileError?.errors[ARRAY_INDEX?.ZERO]?.message}`}
          </Typography>
        ))}
    </>
  );
};

export default RHFFileImport;
