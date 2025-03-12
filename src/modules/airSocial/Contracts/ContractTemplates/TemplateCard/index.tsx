import React from 'react';
import { Box, IconButton } from '@mui/material';
import { styles } from './TemplateCard.style';
import { IconDocumentsText, IconTemplateView } from '@/assets/icons';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

interface TemplateCardProps {
  data: any;
  onClick?: (data: any) => void;
}

export default function TemplateCard({ data, onClick }: TemplateCardProps) {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.cardContent}>
        <Box sx={styles.cardIcon}>
          <IconDocumentsText />
        </Box>
        <Box sx={styles.cardContentTitle}>{data?.name}</Box>
      </Box>
      <Box sx={styles.cardFooter}>
        <Box>
          <Box sx={styles.updatedText}>Updated</Box>
          <Box sx={styles.updatedOn}>
            {dayjs(data?.updatedAt)?.format(DATE_FORMAT?.UI)}
          </Box>
        </Box>
        <IconButton onClick={() => onClick?.(data)}>
          <IconTemplateView />
        </IconButton>
      </Box>
    </Box>
  );
}
