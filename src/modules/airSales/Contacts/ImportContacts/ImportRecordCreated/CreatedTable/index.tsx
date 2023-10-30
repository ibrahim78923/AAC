import React from 'react';

import { Paper, Box, Card } from '@mui/material';

import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { CreatedColumns } from './ContactsTable.data';
import { ImportRecordCreatedData } from '@/mock/modules/airSales/Contacts/ImportHistoryData/ImportRecordTableCreated';

const CreatedTable = () => {
  return (
    <>
      <Card>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TanstackTable
              columns={CreatedColumns}
              data={ImportRecordCreatedData}
            />
            <CustomPagination
              count={1}
              rowsPerPageOptions={[1, 2]}
              entriePages={1}
            />
          </Paper>
        </Box>
      </Card>
    </>
  );
};
export default CreatedTable;
