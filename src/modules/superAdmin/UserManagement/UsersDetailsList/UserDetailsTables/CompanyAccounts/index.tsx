import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { companyColumns } from './CompanyAccounts.data';
import { userListApi } from '@/services/superAdmin/user-management/UserList';

const CompanyAccounts = (props: any) => {
  const { organizationId } = props;
  const { useGetUsersAccountsQuery } = userListApi;
  const params = {
    orgId: organizationId,
  };
  const { data } = useGetUsersAccountsQuery(params);

  return (
    <>
      <TanstackTable
        columns={companyColumns}
        data={data?.data?.usercompanyaccounts}
      />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default CompanyAccounts;
