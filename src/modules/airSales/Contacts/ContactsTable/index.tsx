import React from 'react';

import { Paper, Box } from '@mui/material';

import TanstackTable from '@/components/Tabel/TanstackTable';

import CustomPagination from '@/components/CustomPagination';

import { ContactsTableData } from '@/mock/modules/airSales/Contacts/Deals/ContactsTableData';

import { ContactsColumns } from './ContactsTable.data';

const ContactsTable = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TanstackTable columns={ContactsColumns} data={ContactsTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Paper>
    </Box>
  );
};
export default ContactsTable;
