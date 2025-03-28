import React, { useCallback } from 'react';
import { RHFDropzonePreviewAllTypes } from '@/components/ReactHookForm';
import { useFormContext } from 'react-hook-form';
import { Box, IconButton } from '@mui/material';
import { styles } from './DefaultAttachment.style';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {
  IconExportFeatured,
  IconDefaultAttachment,
  IconAttachmentTrash,
} from '@/assets/icons';
import PDFViewer from '@/modules/airSocial/Contracts/CreateContract/PDFCreateContract/components/PDFViewer';
import { generateSrc, getFileName } from '@/utils/contracts';

export default function DefaultAttachment() {
  const { watch, setValue } = useFormContext();
  const defaultAttachment = watch('attachment');

  const handleReset = useCallback(() => {
    setValue('attachment', null);
  }, [setValue]);

  // const handleUpdatePdf = async (newPdfUrl: string) => {
  //   try {
  //     const response = await fetch(newPdfUrl);
  //     const blob = await response.blob();
  //     const file = new File([blob], 'updated.pdf', { type: 'application/pdf' });

  //     setValue('attachment', file);
  //   } catch (error) {
  //     errorSnackbar(`Failed to update PDF`);
  //   }
  // };

  return (
    <>
      {!defaultAttachment && (
        <RHFDropzonePreviewAllTypes
          label="Default Attachments"
          name="attachment"
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
                <Box className="previewFileName">
                  {getFileName(defaultAttachment)}
                </Box>
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

          {/* Preview PDF */}
          <Box>
            <PDFViewer pdfFile={generateSrc(defaultAttachment)} />
          </Box>
        </Box>
      )}
    </>
  );
}
