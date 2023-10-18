import React from 'react';

import { Paper, Box } from '@mui/material';

import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { dealsTableData } from '@/mock/modules/airSales/Deals/DealsTableData';

import { dealsColumns } from './DealsTable.data';

const DelasTable = () => {
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
};
export default DelasTable;
