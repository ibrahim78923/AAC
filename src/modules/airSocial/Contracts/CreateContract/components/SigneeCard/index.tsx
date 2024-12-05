import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { styles } from './SigneeCard.style';
import { IconTrashContracts, IconUserParty } from '@/assets/icons';
import OnBehalfOf from '../../form-fields/OnBehalfOf';
import PersonalTitle from '../../form-fields/PersonalTitle';
import SigneeEmail from '../../form-fields/SigneeEmail';
import SigneeOrder from '../../form-fields/SigneeOrder';

interface SigneeCardProps {
  signeeId: string;
  onDelete?: () => void;
}

export default function SigneeCard({ signeeId, onDelete }: SigneeCardProps) {
  return (
    <Box sx={styles?.signeeCard}>
      <Box sx={styles?.cardHeader}>
        <Box sx={styles?.cardHeaderHeader}>
          <Box sx={styles?.cardIcon}>
            <IconUserParty />
          </Box>
          <Box sx={styles.cardTitle}>Signee</Box>
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
          <SigneeOrder name={`signeeOrder${signeeId}`} />
        </Grid>
        <Grid item xs={12}>
          <OnBehalfOf />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <PersonalTitle />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <SigneeEmail />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}></Grid>
      </Grid>
    </Box>
  );
}
