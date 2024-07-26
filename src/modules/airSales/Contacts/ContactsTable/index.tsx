import { Paper, Box, Card } from '@mui/material';

import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';

import { ContactsColumns } from './ContactsTable.data';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';

const ContactsTable = ({ search }: any) => {
  const searchObj = {
    search: search,
  };
  const { data } = useGetContactsQuery({ params: searchObj });

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TanstackTable
            columns={ContactsColumns(data)}
            data={data?.data?.contacts}
          />
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
