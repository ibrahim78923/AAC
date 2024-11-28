import React from 'react';
import { Box } from '@mui/material';
import { styles } from './CreateDraftCard.style';
import { IconCreateDraft } from '@/assets/icons';

interface TemplateCardProps {
  onClick: () => void;
}

export default function CreateDraftCard({ onClick }: TemplateCardProps) {
  return (
    <Box sx={styles.card} onClick={onClick}>
      <Box>
        <IconCreateDraft />
        <Box sx={styles.createDraft}>Create a blank draft</Box>
      </Box>
    </Box>
  );
}
