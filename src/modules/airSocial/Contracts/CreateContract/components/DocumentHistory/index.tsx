import React from 'react';
import { Box } from '@mui/material';
import { styles } from './DocumentHistory.style';
import { IconDocHistory } from '@/assets/icons';

const documtents = [
  {
    _id: 1,
    title: 'Request approval of drafts',
    desc: 'When draft is created, then request approval.',
  },
  {
    _id: 2,
    title: 'Request approval of drafts',
    desc: 'When draft is created, then request approval.',
  },
];

export default function DocumentHistory() {
  return (
    <Box sx={styles?.container}>
      <Box sx={styles?.title}>Document History</Box>
      {documtents?.map((document: any) => (
        <Box sx={styles.document} key={document?._id}>
          <Box sx={styles.icon}>
            <IconDocHistory />
          </Box>
          <Box sx={styles?.documentInfo}>
            <Box sx={styles?.docTitle}>{document.title}</Box>
            <Box sx={styles?.docDesc}>{document.desc}</Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
