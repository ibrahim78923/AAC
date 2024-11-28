import React from 'react';
import { Box, IconButton } from '@mui/material';
import { styles } from './TemplateCard.style';
import { IconDocumentsText, IconTemplateView } from '@/assets/icons';
import { useRouter } from 'next/navigation';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
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
        <Box sx={styles.cardContentTitle}>{data?.title}</Box>
      </Box>
      <Box sx={styles.cardFooter}>
        <Box>
          <Box sx={styles.updatedText}>Updated</Box>
          <Box sx={styles.updatedOn}>{data?.updatedOn}</Box>
        </Box>
        <IconButton
          onClick={() => {
            router.push(
              `${AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE}?id=${data?._id}`,
            );
          }}
        >
          <IconTemplateView />
        </IconButton>
      </Box>
    </Box>
  );
}
