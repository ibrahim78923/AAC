import React from 'react';
import { Box } from '@mui/material';
import { styles } from './DocumentHistory.style';
import { IconDocHistory } from '@/assets/icons';

interface DocumentHistoryProps {
  data: any;
}

export default function DocumentHistory({ data }: DocumentHistoryProps) {
  return (
    <Box sx={styles?.container}>
      <Box sx={styles?.title}>Document History</Box>
      {data?.map((document: any) => (
        <Box sx={styles.document} key={document?._id}>
          <Box sx={styles.icon}>
            <IconDocHistory />
          </Box>
          <Box sx={styles?.documentInfo}>
            <Box sx={styles?.docTitle}>{document.title}</Box>
            <Box sx={styles?.docDesc}>{document.description}</Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
