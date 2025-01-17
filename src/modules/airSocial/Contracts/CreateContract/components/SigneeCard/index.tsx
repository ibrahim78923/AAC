import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { styles } from './SigneeCard.style';
import { IconTrashContracts, IconUserParty } from '@/assets/icons';
import OnBehalfOf from './form-fields/OnBehalfOf';
import PersonalTitle from './form-fields/PersonalTitle';
import SigneeEmail from './form-fields/SigneeEmail';
import SigningOrder from './form-fields/SigningOrder';
import SigneeFullName from './form-fields/SigneeFullName';

interface SigneeCardProps {
  index: number;
  onDelete?: () => void;
}

export default function SigneeCard({ index, onDelete }: SigneeCardProps) {
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
          <IconButton onClick={onDelete} className="delete-button">
            <IconTrashContracts />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={'4px'}>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <SigningOrder name={`signees.${index}.signingOrder`} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <OnBehalfOf name={`signees.${index}.onBehalfOf`} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <PersonalTitle name={`signees.${index}.personalTitle`} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <SigneeFullName name={`signees.${index}.name`} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}>
          <SigneeEmail name={`signees.${index}.email`} />
        </Grid>
        <Grid item xs={12} sx={styles?.fieldLabel}></Grid>
      </Grid>
    </Box>
  );
}
