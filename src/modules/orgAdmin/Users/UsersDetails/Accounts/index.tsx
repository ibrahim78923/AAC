import TanstackTable from '@/components/Table/TanstackTable';

import { companyColumns } from './Accounts.data';
import useAccounts from './useAccounts';

const Accounts = (props: any) => {
  const { employeeDataById } = props;
  const { useGetUsersAccountsQuery } = useAccounts();
  const { data: userAccounts } = useGetUsersAccountsQuery({
    orgId: employeeDataById,
  });

  return (
    <TanstackTable
      columns={companyColumns}
      data={userAccounts?.data?.usercompanyaccounts}
    />
  );
};

export default Accounts;
