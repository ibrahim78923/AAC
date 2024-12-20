import React from 'react';
import { RHFDropzonePreviewAllTypes } from '@/components/ReactHookForm';
import {
  IconExportFeatured,
  IconDefaultAttachment,
  IconAttachmentTrash,
} from '@/assets/icons';
import { useFormContext } from 'react-hook-form';
import { Box, IconButton } from '@mui/material';
import { styles } from './DefaultAttachment.style';

export default function DefaultAttachment() {
  const { watch, setValue } = useFormContext();

  const defaultAttachment = watch('defaultAttachment');

  const handleReset = () => {
    setValue('defaultAttachment', null);
  };

  return (
    <>
      {!defaultAttachment && (
        <RHFDropzonePreviewAllTypes
          label="Default Attachments"
          name="defaultAttachment"
          fileName=""
          fileType="PDF (max 2.44 MB)"
          accept={{
            'application/pdf': ['.pdf'],
          }}
          icon={<IconExportFeatured />}
        />
      )}
      {defaultAttachment && (
        <Box sx={styles?.attachmentPreview}>
          <Box className="previewLabel">Default attachment</Box>
          <Box className="previewInfobar">
            <Box className="previewInfo">
              <Box className="previewFileIcon">
                <IconDefaultAttachment />
              </Box>
              <Box>
                <Box className="previewFileName">{defaultAttachment?.name}</Box>
                <Box className="previewFileSize">
                  {Math.floor(defaultAttachment?.size / 1024)} MB
                </Box>
              </Box>
            </Box>

            <Box className="previewInfobarAction">
              <IconButton onClick={handleReset}>
                <IconAttachmentTrash />
              </IconButton>
            </Box>
          </Box>

          <Box sx={styles?.embedPdf}>
            <embed
              src={`${URL.createObjectURL(
                new Blob([defaultAttachment], { type: 'application/pdf' }),
              )}`}
              type="application/pdf"
            />
          </Box>
        </Box>
      )}
    </>
  );
}
