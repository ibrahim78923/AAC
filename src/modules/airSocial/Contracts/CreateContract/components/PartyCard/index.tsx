import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { styles } from './PartyCard.style';
import { IconTrashContracts, IconUserParty } from '@/assets/icons';
import PartyType from './form-fields/PartyType';
import FullName from './form-fields/FullName';
import Address from './form-fields/Address';
import NationalIDNo from './form-fields/NationalIDNo';
import HereinafterReferredToAs from './form-fields/HereinafterReferredToAs';

interface PartyCardProps {
  index: any;
  onDelete?: () => void;
}

export default function PartyCard({ index, onDelete }: PartyCardProps) {
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
          <IconButton onClick={onDelete} className="delete-button">
            <IconTrashContracts />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={'4px'}>
        <Grid item xs={12}>
          <PartyType name={`parties.${index}.moduleType`} />
        </Grid>
        <Grid item xs={12}>
          <FullName index={index} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <Address name={`parties.${index}.address`} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <NationalIDNo name={`parties.${index}.idNumber`} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <HereinafterReferredToAs name={`parties.${index}.referredAs`} />
        </Grid>
      </Grid>
    </Box>
  );
}
