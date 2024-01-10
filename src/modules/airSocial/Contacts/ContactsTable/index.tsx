import { Paper, Box, Card } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

const ContactsTable = ({
  isLoading,
  data,
  columns,
  onPageChange,
  setPage,
  setPageLimit,
}: any) => {
  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TanstackTable
            columns={columns}
            isLoading={isLoading}
            data={data?.data?.contacts}
            isPagination
            count={data?.data?.meta?.pages}
            totalRecords={data?.data?.meta?.total}
            onPageChange={onPageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Paper>
      </Box>
    </Card>
  );
};
export default ContactsTable;
