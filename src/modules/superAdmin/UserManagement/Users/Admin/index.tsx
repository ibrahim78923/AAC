import TanstackTable from '@/components/Table/TanstackTable';

import { superAdminColumns } from '../Users.data';
import useUserManagement from '../../useUserManagement';

const Admin = (props: any) => {
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
    role: 'SUPER_ADMIN',
    search: searchVal ?? '',
    products: filterValues?.products ?? '',
    // organization: filterValues?.organization ?? ''
  };
  const { data, isSuccess, isLoading } = useGetUsersQuery(params);
  const columnsProps = {
    handleUserSwitchChange: handleUserSwitchChange,
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };
  const columnParams = superAdminColumns(columnsProps);

  return (
    <>
      <TanstackTable
        columns={columnParams}
        data={data?.data?.users}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={data?.data?.meta?.pages}
        isPagination
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default Admin;
