import Search from '@/components/Search';
import { Box, Card, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import useUserReports from './useInvoicesReports';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { usersData, usersColumns } from './useInvoicesReports.data';
import Link from 'next/link';
import InvoicesAnalystGraph from './InvoicesAnalystGraph';

const InvoicesReports = () => {
  const { searchBy, setSearchBy }: any = useUserReports;

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box mt={1}>
          <Link href="/super-admin/reports">
            <ArrowBack />
          </Link>
        </Box>
        <Typography variant="h3">Invoices Report</Typography>
      </Box>
      <Card sx={{ mb: '30px' }}>
        <InvoicesAnalystGraph />
      </Card>
      <Card>
        <Box
          display="flex"
          flexWrap={'wrap'}
          justifyContent="space-between"
          alignItems="center"
          mx={2}
          my={1}
        >
          <Typography variant="h4">Overview</Typography>
          <Search
            label="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            width={260}
          />
        </Box>
        <Box>
          <TanstackTable columns={usersColumns} data={usersData} />
          <Box sx={{ padding: '0px 20px' }}>
            <CustomPagination
              count={1}
              rowsPerPageOptions={[1, 2]}
              entriePages={1}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default InvoicesReports;
