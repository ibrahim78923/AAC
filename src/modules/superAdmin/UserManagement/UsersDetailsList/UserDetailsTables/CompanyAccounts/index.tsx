import TanstackTable from '@/components/Table/TanstackTable';
import { companyColumns } from './CompanyAccounts.data';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { Box } from '@mui/material';
import useCompanyAccounts from './useCompanyAccounts';
import useAccounts from '@/modules/orgAdmin/Users/UsersDetails/Accounts/useAccounts';

const CompanyAccounts = (props: any) => {
  const { organizationId, employeeDataById, searchAccount } = props;
  const { useGetUsersAccountsQuery } = userListApi;
  const { page, setPage, pageLimit, setPageLimit } = useCompanyAccounts();
  const { handleStatusUpdate } = useAccounts();

  const accountsParams = {
    page: page,
    limit: pageLimit,
    search: searchAccount ? searchAccount : undefined,
  };
  const {
    data: userAccounts,
    isLoading,
    isSuccess,
  } = useGetUsersAccountsQuery({
    id: employeeDataById,
    orgId: organizationId,
    values: accountsParams,
  });

  return (
    <Box
      sx={{
        maxHeight: `calc(50vh - ${15}px)`,
        overflow: 'auto',
      }}
    >
      <TanstackTable
        columns={companyColumns(handleStatusUpdate)}
        data={userAccounts?.data?.usercompanyaccounts}
        isPagination
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={userAccounts?.data?.meta?.pages}
        pageLimit={userAccounts?.data?.meta?.limit}
        totalRecords={userAccounts?.data?.meta?.total}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </Box>
  );
};

export default CompanyAccounts;
