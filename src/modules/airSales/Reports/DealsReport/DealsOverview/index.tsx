import React from 'react';

import { Box, Theme, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './DealsOverview.data';

import { DealOverviewTableData } from '@/mock/modules/airSales/Reports/DealsReport';

import { styles } from './DealsOverview.style';

const DealsOverview = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box sx={styles.dealBox(theme)}>
        <Typography
          variant="h5"
          sx={{ color: `${theme?.palette?.grey[800]}`, mb: { xs: '10px' } }}
        >
          Deals Overview
        </Typography>
        <Search label="Search here" />
      </Box>
      <TanstackTable
        columns={columns}
        data={DealOverviewTableData}
        isPagination
      />
    </>
  );
};

export default DealsOverview;
