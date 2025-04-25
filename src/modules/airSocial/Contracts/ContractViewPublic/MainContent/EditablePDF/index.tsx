import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { styles } from './EditablePDF.style';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { IconDefaultAttachment } from '@/assets/icons';
import PDFViewer from '@/modules/airSocial/Contracts/CreateContract/PDFCreateContract/components/PDFViewer';

import { generateSrc, getFileName } from '@/utils/contracts';
import { useDispatch } from 'react-redux';
import {
  setTextComponents,
  setSignatureComponents,
} from '@/redux/slices/airSocial/contracts/pdf-contract/slice';

export default function EditablePDF({
  contractData,
  onSignatureClick,
  signees,
}: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTextComponents(contractData?.textComponent || []));
  }, [contractData, dispatch]);

  useEffect(() => {
    dispatch(setSignatureComponents(contractData?.signatureComponent || []));
  }, [contractData, dispatch]);

  const sizeMB = contractData?.latestAttachment?.size / (1024 * 1024);
  return (
    <Box sx={styles?.attachmentPreview}>
      <Box className="previewLabel">Default attachment</Box>
      <Box className="previewInfobar">
        <Box className="previewInfo">
          <Box className="previewFileIcon">
            <IconDefaultAttachment />
          </Box>
          <Box>
            <Box className="previewFileName">
              {getFileName(contractData?.latestAttachment)}
            </Box>
            <Box className="previewFileSize">
              {sizeMB < 1
                ? Math.round(contractData?.latestAttachment?.size / 1024) +
                  ' KB'
                : Math.round(sizeMB) + ' MB'}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Preview PDF */}
      <Box>
        <PDFViewer
          pdfFile={generateSrc(contractData?.latestAttachment)}
          onSignatureClick={onSignatureClick}
          signees={signees}
          readonly={true}
        />
      </Box>
    </Box>
  );
}
