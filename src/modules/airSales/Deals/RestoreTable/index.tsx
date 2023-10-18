import React from 'react';

import Link from 'next/link';

import { Box, Paper, Typography, useTheme } from '@mui/material';

import Layout from '@/layout';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { RestoreTableData } from '@/mock/modules/airSales/Deals/Restore';

import { RestoreTableColumns } from './RestoreTable.data';

import { BackArrIcon } from '@/assets/icons';

const RestoreTable = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', my: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={'/air-sales/deals'}>
              <BackArrIcon />
            </Link>
            <Typography
              variant="subtitle1"
              sx={{ colors: theme.palette.grey[600], ml: '10px' }}
            >
              {' '}
              Restore Deals
            </Typography>
          </Box>
        </Box>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <TanstackTable
            columns={RestoreTableColumns}
            data={RestoreTableData}
          />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Paper>
      </Box>
    </Layout>
  );
};

export default RestoreTable;
