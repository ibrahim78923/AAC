import { Paper, Box, Card } from '@mui/material';

import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';

import { ContactsTableData } from '@/mock/modules/airSales/Contacts/ContactsTableData';

import { ContactsColumns } from './ContactsTable.data';

const ContactsTable = () => {
  return (
    <Card>
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
    </Card>
  );
};
export default ContactsTable;
