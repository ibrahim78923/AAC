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
import PDFViewer from '@/components/PDFViewer';
import {
  TextComponentI,
  signatureFieldI,
} from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';
import { generateSrc, getFileName } from '@/utils/contracts';

interface DefaultAttachmentProps {
  addTextComponent: TextComponentI[];
  addSignatureFields: signatureFieldI[];
  handleDeleteSignature: (id: string) => void;
  handleDeleteText: (id: string) => void;
}

export default function DefaultAttachment({
  addTextComponent,
  addSignatureFields,
  handleDeleteSignature,
  handleDeleteText,
}: DefaultAttachmentProps) {
  const { watch, setValue } = useFormContext();
  const defaultAttachment = watch('attachment');

  const handleReset = useCallback(() => {
    setValue('attachment', null);
  }, [setValue]);

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
            <PDFViewer
              pdfFile={generateSrc(defaultAttachment)}
              addTextComponent={addTextComponent}
              addSignatureFields={addSignatureFields}
              handleDeleteText={handleDeleteText}
              handleDeleteSignature={handleDeleteSignature}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
