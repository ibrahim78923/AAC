import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './TemplateBasic.style';

const TemplateBasic = () => {
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
          <Box sx={styles?.vCellRight}>My Goal</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Object</Box>
          <Box sx={styles?.vCellRight}>Call</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Property</Box>
          <Box sx={styles?.vCellRight}>Call duration</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Aggregation Type</Box>
          <Box sx={styles?.vCellRight}>Sum</Box>
        </Box>

        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Unit of Measurement</Box>
          <Box sx={styles?.vCellRight}>Duration - Minutes</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Property Date</Box>
          <Box sx={styles?.vCellRight}>Activity Date</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Tracking Method</Box>
          <Box sx={styles?.vCellRight}>
            Higher value is better lower is worst
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateBasic;
