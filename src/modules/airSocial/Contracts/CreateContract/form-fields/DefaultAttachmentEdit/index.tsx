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
import { TextComponentI, signatureFieldI } from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';

interface DefaultAttachmentProps {
  addTextComponent: TextComponentI[];
  addSignatureFields: signatureFieldI[];
  onClickSignatureDelete?: (id: string) => void;
  onClickTextDelete?: (id: string) => void;
}

export default function DefaultAttachment({ addTextComponent, addSignatureFields, onClickSignatureDelete, onClickTextDelete }: DefaultAttachmentProps) {
  const { watch, setValue } = useFormContext();
  const defaultAttachment = watch('defaultAttachment');

  const handleReset = useCallback(() => {
    setValue('defaultAttachment', null);
  }, [setValue]);



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

          {/* Preview PDF */}
          <Box>
            <PDFViewer
              pdfFile={defaultAttachment}
              addTextComponent={addTextComponent}
              addSignatureFields={addSignatureFields}
              onClickTextDelete={onClickTextDelete}
              onClickSignatureDelete={onClickSignatureDelete}
            />
          </Box>

        </Box>
      )}
    </>
  );
}
