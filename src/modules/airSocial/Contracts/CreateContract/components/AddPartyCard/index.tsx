import React from 'react';
import { Box } from '@mui/material';
import { styles } from './AddPartyCard.style';
import { IconAddParty } from '@/assets/icons';

interface AddPartyCardProps {
  onClick: () => void;
}

export default function AddPartyCard({ onClick }: AddPartyCardProps) {
  return (
    <Box sx={styles?.addPartyCard} onClick={onClick}>
      <Box sx={styles?.addPartyContent}>
        <Box sx={styles?.addIcon}>
          <IconAddParty />
        </Box>
        <Box sx={styles?.addPartyTitle}>Add Party</Box>
        <Box sx={styles?.addPartyDesc}>
          Add each party only once. Multiple persons can sign on behalf of the
          same party.
        </Box>
      </Box>
    </Box>
  );
}
