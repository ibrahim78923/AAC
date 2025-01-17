import React from 'react';
import { Box, IconButton } from '@mui/material';
import { styles } from './TemplateCard.style';
import { IconDocumentsText, IconTemplateView } from '@/assets/icons';
import { useRouter } from 'next/navigation';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

interface TemplateCardProps {
  data: any;
}

export default function TemplateCard({ data }: TemplateCardProps) {
  const router = useRouter();

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
        <IconButton
          onClick={() => {
            router.push(
              `${AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE}?templateId=${data?._id}`,
            );
          }}
        >
          <IconTemplateView />
        </IconButton>
      </Box>
    </Box>
  );
}
