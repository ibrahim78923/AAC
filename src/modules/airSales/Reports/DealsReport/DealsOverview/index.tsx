import React from 'react';
import Search from '@/components/Search';
import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { columns } from './DealsOverview.data';
import { DealOverviewTableData } from '@/mock/modules/airSales/Reports/DealsReport';

const DealsOverview = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #EAECF0',
          padding: '24px',
        }}
      >
        <Typography variant="h5" sx={{ color: '#1F2937' }}>
          Deals Overview
        </Typography>
        <Search label="Search here" />
      </Box>
      <Grid>
        <TanstackTable columns={columns} data={DealOverviewTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Grid>
    </>
  );
};

export default DealsOverview;
