import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { companyColumns } from './CompanyAccounts.data';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { Box } from '@mui/material';

const CompanyAccounts = (props: any) => {
  const { organizationId } = props;
  const { useGetUsersAccountsQuery } = userListApi;
  const params = {
    orgId: organizationId,
  };
  const { data } = useGetUsersAccountsQuery(params);

  return (
    <Box
      sx={{
        maxHeight: `calc(50vh - ${15}px)`,
        overflow: 'auto',
      }}
    >
      <TanstackTable
        columns={companyColumns}
        data={data?.data?.usercompanyaccounts}
      />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </Box>
  );
};

export default CompanyAccounts;
