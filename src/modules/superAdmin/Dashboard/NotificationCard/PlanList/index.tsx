import React from 'react';
import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { columns } from './PlanList.data';
import { planListData } from '@/mock/modules/SuperAdminDashboard';

const PlanList = () => {
  const theme = useTheme<Theme>();
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.grey[700]}`,
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
        }}
      >
        <Typography variant="body2" sx={{ color: '#030229', fontWeight: 600 }}>
          Plan list
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: `${theme?.palette?.primary.main}`,
            fontWeight: 600,
          }}
        >
          View All
        </Typography>
      </Box>
      <Grid sx={{ paddingTop: '1rem' }}>
        <TanstackTable columns={columns} data={planListData} />
      </Grid>
    </Box>
  );
};

export default PlanList;
