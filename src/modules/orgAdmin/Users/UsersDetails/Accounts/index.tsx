import TanstackTable from '@/components/Table/TanstackTable';
import { companyColumns } from './Accounts.data';
import useAccounts from './useAccounts';
import useUsers from '../../useUsers';

const Accounts = (props: any) => {
  const { employeeDataById, searchAccount } = props;
  const { user } = useUsers();
  const {
    useGetUsersAccountsQuery,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    handleStatusUpdate,
    isLoadingStatus,
    editRoleModal,
    setEditRoleModal,
    userAccountsList,
  } = useAccounts();

  const accountsParams = {
    page: page,
    limit: pageLimit,
    search: searchAccount ? searchAccount : undefined,
  };
  const {
    data: userAccounts,
    isLoading,
    isSuccess,
  } = useGetUsersAccountsQuery(
    {
      id: employeeDataById,
      orgId: user?.organization?._id,
      values: accountsParams,
    },
    { skip: !employeeDataById },
  );

  return (
    <TanstackTable
      columns={companyColumns(
        handleStatusUpdate,
        isLoadingStatus,
        editRoleModal,
        setEditRoleModal,
        userAccountsList,
      )}
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
      currentPage={userAccounts?.data?.meta?.page}
    />
  );
};

export default Accounts;
