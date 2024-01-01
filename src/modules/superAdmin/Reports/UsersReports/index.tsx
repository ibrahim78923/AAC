import { Box, Card, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Search from '@/components/Search';
import useUserReports from './useUserReports';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { usersData, usersColumns } from './UserReports.data';
import Link from 'next/link';
import ProductWiseGrpah from './ProductWiseGraph';

const UsersReports = () => {
  const { searchBy, setSearchBy }: any = useUserReports;

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box mt={1}>
          <Link href="/super-admin/reports">
            <ArrowBack />
          </Link>
        </Box>
        <Typography variant="h3">User Report</Typography>
      </Box>
      <Card sx={{ mb: '30px' }}>
        <ProductWiseGrpah />
      </Card>
      <Card>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mx={2}
          my={1}
        >
          <Typography variant="h4">Users</Typography>
          <Search
            label="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            width={260}
          />
        </Box>
        <Box>
          <TanstackTable columns={usersColumns} data={usersData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default UsersReports;
