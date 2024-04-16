import { Paper, Box, Card } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

const ContactsTable = ({
  isLoading,
  data,
  columns,
  setPage,
  setPageLimit,
}: any) => {
  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TanstackTable
            columns={columns}
            data={data?.data?.contacts}
            isLoading={isLoading}
            currentPage={data?.data?.meta?.page}
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            totalRecords={data?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Paper>
      </Box>
    </Card>
  );
};
export default ContactsTable;
