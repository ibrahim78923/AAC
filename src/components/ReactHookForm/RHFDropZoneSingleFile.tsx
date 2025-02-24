import { useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CustomLabel from '../CustomLabel';
import { FILE_MAX_SIZE, FILE_SIZE_MESSAGES } from '@/config';
import { AttachFileCard } from '../Avatars/AttachFileCard';
import { maxFileSize, uploadFileMaxSize } from '@/utils/avatarUtils';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import PreviewSingleFileUploaderAvatar from '../Avatars/PreviewSingleFileUploaderAvatar';

export default function RHFDropZoneSingleFile(props: any) {
  const {
    name,
    required,
    fileName = 'Attach a file',
    fileType = `PNG, JPG , PDF and DOC (max ${uploadFileMaxSize} MB)`,
    accept = {
      'image/png': ['.png', '.PNG'],
      'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxSize = FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE,
    multiple = false,
    isPreviewMode = false,
    attachmentPreviewDetail = {},
    disabled,
    ...other
  } = props;

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

  const { getRootProps, getInputProps, fileRejections, acceptedFiles } =
    useDropzone({
      multiple,
      accept,
      disabled,
      maxSize,
      onDrop,
    });

  const attachedFile = useMemo(() => {
    return acceptedFiles?.[ARRAY_INDEX?.ZERO] || getValues(name);
  }, [acceptedFiles, getValues(name), name]);

  if (isPreviewMode)
    return (
      <>
        {other?.label && (
          <CustomLabel label={other?.label} required={required} />
        )}
        <Box
          onClick={undefined}
          sx={{
            border: '1px solid',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            cursor: 'pointer',
            borderColor: 'custom.off_white_three',
          }}
        >
          <AttachFileCard
            size={{ width: 60, height: 60 }}
            hasStyling={false}
            canDelete={false}
            data={attachmentPreviewDetail}
            flexDirection={'column'}
          />
        </Box>
      </>
    );

  return (
    <>
      <input {...getInputProps()} id={name} />
      {other?.label && <CustomLabel label={other?.label} required={required} />}
      <label htmlFor={name}>
        <Box
          {...getRootProps()}
          onClick={undefined}
          sx={{
            border: '1px solid',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            cursor: 'pointer',
            borderColor: 'custom.off_white_three',
          }}
        >
          {!!attachedFile ? (
            <PreviewSingleFileUploaderAvatar
              setValue={setValue}
              attachedFile={attachedFile}
              name={name}
            />
          ) : (
            <>
              <AttachFileIcon />
              <Typography variant="body1" fontWeight={'fontWeightBold'}>
                {fileName}
              </Typography>
              <Typography variant="body2" sx={{ my: 0.5 }}>
                <Typography component="span" variant="body2" color="primary">
                  Click to upload{' '}
                </Typography>
                or drag and drop
              </Typography>
              <Typography variant="body3">{fileType}</Typography>
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
              ? `File size should be less than ${maxFileSize(maxSize)}`
              : `${fileError?.errors[ARRAY_INDEX?.ZERO]?.message}`}
          </Typography>
        ))}
    </>
  );
}
