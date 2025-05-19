import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
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
  const { watch, setValue } = useFormContext();
  const moduleType = watch(`parties.${index}.moduleType`);
  const moduleData = watch(`parties.${index}.moduleData`);

  // Track original values per module type
  const originalValues: any = useRef<{
    COMPANIES: any;
    CONTACTS: any;
  }>({ COMPANIES: null, CONTACTS: null });
  const prevModuleType = useRef(moduleType);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Store the current value when moduleData changes
    if (moduleData && prevModuleType.current === moduleType) {
      originalValues.current[moduleType] = moduleData;
    }

    // When module type changes
    if (prevModuleType.current !== moduleType) {
      // Store the current value before changing
      if (moduleData) {
        originalValues.current[prevModuleType.current] = moduleData;
      }

      // Restore the original value for the new module type
      const originalValue = originalValues.current[moduleType];
      setValue(`parties.${index}.moduleData`, originalValue || null);

      // Update previous module type
      prevModuleType.current = moduleType;
    }
  }, [moduleType, moduleData, setValue, index]);

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
