import { Box, Card, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Search from '@/components/Search';
import useUserReports from './useUserReports';
import TanstackTable from '@/components/Table/TanstackTable';
import { usersColumns } from './UserReports.data';
import Link from 'next/link';
import ProductWiseGrpah from './ProductWiseGraph';
import useUserManagement from '@/modules/superAdmin/UserManagement/useUserManagement';

const UsersReports = () => {
  const {
    setSearchBy,
    usersReportsGraphData,
    companyOwnerUsersData,
    setPage,
    setPageLimit,
    isFetching,
    isSuccess,
    usersLoading,
  } = useUserReports();
  const { handleUserSwitchChange } = useUserManagement();

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
        <ProductWiseGrpah usersReportsGraphData={usersReportsGraphData?.data} />
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
          <Typography variant="h4">Users</Typography>
          <Search label="Search Here" setSearchBy={setSearchBy} width={260} />
        </Box>
        <Box>
          <TanstackTable
            columns={usersColumns(handleUserSwitchChange)}
            data={companyOwnerUsersData?.data?.users}
            isPagination
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
            count={companyOwnerUsersData?.data?.meta?.pages}
            pageLimit={companyOwnerUsersData?.data?.meta?.limit}
            totalRecords={companyOwnerUsersData?.data?.meta?.total}
            isLoading={usersLoading}
            isSuccess={isSuccess}
            isFetching={isFetching}
            currentPage={companyOwnerUsersData?.data?.meta?.page}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default UsersReports;
