import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './TemplateBasic.style';
import { useAppSelector } from '@/redux/store';

const TemplateBasic = () => {
  const describeForm: any = useAppSelector(
    (state) => state?.forecastForm?.describeForm,
  );

  return (
    <Box sx={styles?.container}>
      <Box sx={styles?.header}>
        <Typography variant="h4" sx={styles?.headerTitle}>
          Preview
        </Typography>
      </Box>

      <Box sx={styles?.voucher}>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Goal Name</Box>
          <Box sx={styles?.vCellRight}>{describeForm?.goalName}</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Object</Box>
          <Box sx={styles?.vCellRight}>Deal</Box>
        </Box>

        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Aggregation Type</Box>
          <Box sx={styles?.vCellRight}>Sum</Box>
        </Box>

        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Unit of Measurement</Box>
          <Box sx={styles?.vCellRight}>£ Pound </Box>
        </Box>

        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Tracking Method</Box>
          <Box sx={styles?.vCellRight}>{describeForm?.trackingMethod}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateBasic;
