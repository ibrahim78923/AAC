import React from 'react';

import { Typography, Box } from '@mui/material';

import ImportDealsDrawer from '../ImportDealsDrawer';
import CreateDeal from '../CreateDeal';
import ViewAllDeals from '../ViewAllDeals';

import { styles } from './DealHeader.style';

const DealHeader = () => {
  return (
    <Box sx={styles.HeaderStyle}>
      <Typography variant="h4" sx={styles.HeaderTypography}>
        <ViewAllDeals />
      </Typography>
      <Box sx={styles.HeaderChildStyle}>
        <ImportDealsDrawer />
        <CreateDeal />
      </Box>
    </Box>
  );
};

export default DealHeader;
