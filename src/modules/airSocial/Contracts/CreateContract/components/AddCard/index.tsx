import React from 'react';
import { Box } from '@mui/material';
import { styles } from './AddCard.style';
import { IconAddParty } from '@/assets/icons';

interface AddCardProps {
  title: string;
  onClick: () => void;
}

export default function AddCard({ title, onClick }: AddCardProps) {
  return (
    <Box sx={styles?.addCard} onClick={onClick}>
      <Box sx={styles?.addCardContent}>
        <Box sx={styles?.addCardIcon} className="add-card-icon">
          <IconAddParty />
        </Box>
        <Box sx={styles?.addCardTitle}>{title}</Box>
        <Box sx={styles?.addCardDesc}>
          Add each party only once. Multiple persons can sign on behalf of the
          same party.
        </Box>
      </Box>
    </Box>
  );
}
