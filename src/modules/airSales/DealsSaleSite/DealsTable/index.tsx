import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { dealsTableData } from '@/mock/modules/airSales/Deals/DealsTableData';
import { dealsColumns } from './TableColumns.data';

export default function DelasTable() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TanstackTable columns={dealsColumns} data={dealsTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Paper>
    </Box>
  );
}
