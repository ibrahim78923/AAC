import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { styles } from './PartyCard.style';
import { IconTrashContracts, IconUserParty } from '@/assets/icons';
import PartyType from '../../form-fields/PartyType';
import FullName from '../../form-fields/FullName';
import Address from '../../form-fields/Address';
import NationalIDNo from '../../form-fields/NationalIDNo';
import HereinafterReferredToAs from '../../form-fields/HereinafterReferredToAs';

interface PartyCardProps {
  onDelete?: () => void;
}

export default function PartyCard({ onDelete }: PartyCardProps) {
  return (
    <Box sx={styles?.partyCard}>
      <Box sx={styles?.cardHeader}>
        <Box sx={styles?.cardHeaderHeader}>
          <Box sx={styles?.cardIcon}>
            <IconUserParty />
          </Box>
          <Box sx={styles.cardTitle}>Party</Box>
        </Box>
        <Box sx={styles?.cardHeaderActions}>
          {onDelete && (
            <IconButton onClick={onDelete} className="delete-button">
              <IconTrashContracts />
            </IconButton>
          )}
        </Box>
      </Box>
      <Grid container spacing={'4px'}>
        <Grid item xs={12}>
          <PartyType />
        </Grid>
        <Grid item xs={12}>
          <FullName />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <Address />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <NationalIDNo />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <HereinafterReferredToAs />
        </Grid>
      </Grid>
    </Box>
  );
}
