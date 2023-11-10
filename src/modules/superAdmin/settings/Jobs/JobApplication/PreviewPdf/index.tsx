import { Box, useTheme } from '@mui/material';

import { styles } from './PreviewPdf.style';

const PreviewPdf = () => {
  const theme = useTheme();
  return (
    <Box sx={styles.mainWrapperPdfViewer}>
      <Box sx={styles.pdfPreviewContainer}>
        <Box sx={styles.header(theme)}></Box>
      </Box>
    </Box>
  );
};

export default PreviewPdf;
