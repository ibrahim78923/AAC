import React from 'react';

import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './TableSection.data';
import { InQueueData } from '@/mock/modules/airCallCenter/Dashboard';

const TableSection = () => {
  const theme = useTheme<Theme>();
  return (
    <Grid container mt={2}>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: `${theme?.palette?.custom?.dark_blue}`,
              fontWeight: 600,
            }}
          >
            In Queue ( 4 )
          </Typography>
        </Box>
        <Grid sx={{ paddingTop: '.5rem' }}>
          <TanstackTable columns={columns} data={InQueueData} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}></Grid>
      <Grid item xs={12} md={4}></Grid>
    </Grid>
  );
};

export default TableSection;
