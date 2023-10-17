import React from 'react';

import { Typography, Box } from '@mui/material';

import ImportDeal from '../ImportDeal';
import CreateDeal from '../CreateDeal';
import ViewAllDeals from '../ViewAll';
import { styles } from './DealHeader.style';

const DealHeader = () => {
  return (
    <Box sx={styles.HeaderStyle}>
      <Typography variant="h4" sx={styles.HeaderTypography}>
        <ViewAllDeals />
      </Typography>
      <Box sx={styles.HeaderChildStyle}>
        <ImportDeal />
        <CreateDeal />
      </Box>
    </Box>
  );
};

export default DealHeader;
