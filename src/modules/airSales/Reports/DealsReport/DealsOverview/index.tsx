import React from 'react';

import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { columns } from './DealsOverview.data';

import { DealOverviewTableData } from '@/mock/modules/airSales/Reports/DealsReport';

import { styles } from './DealsOverview.style';

const DealsOverview = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box sx={styles.dealBox(theme)}>
        <Typography variant="h5" sx={{ color: `${theme.palette.grey[800]}` }}>
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
