import React from 'react';
import { Typography, Box } from '@mui/material';
import ImportDeal from '../ImportDeal';
import CreateDeal from '../CreateDeal';
import ViewAllDeals from '../ViewAll';

const DealHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <ViewAllDeals />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <ImportDeal />
        <CreateDeal />
      </Box>
    </Box>
  );
};

export default DealHeader;
