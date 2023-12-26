import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './Users.data';
import useUserManagement from '../useUserManagement';

const Users = (props: any) => {
  const { checkedRows, setCheckedRows, filterValues, searchVal } = props;
  const {
    useGetUsersQuery,
    handleUserSwitchChange,
    pageLimit,
    setPageLimit,
    page,
    setPage,
  } = useUserManagement();

  const params = {
    page: page,
    limit: pageLimit,
    role: 'ORG_ADMIN',
    search: searchVal ?? '',
    products: filterValues?.products ?? '',
    // organization: filterValues?.organization ?? ''
  };
  const { data, isLoading, isSuccess } = useGetUsersQuery(params);
  const columnsProps = {
    handleUserSwitchChange: handleUserSwitchChange,
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };
  const columnParams = columns(columnsProps);

  return (
    <>
      <TanstackTable
        columns={columnParams}
        data={data?.data?.users}
        isPagination
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default Users;
