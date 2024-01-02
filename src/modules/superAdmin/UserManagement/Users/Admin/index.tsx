import TanstackTable from '@/components/Table/TanstackTable';
import { superAdminColumns } from '../Users.data';
import useUserManagement from '../../useUserManagement';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const Admin = (props: any) => {
  const { checkedRows, setCheckedRows, date, searchVal } = props;
  const {
    useGetUsersQuery,
    handleUserSwitchChange,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    initialTab,
  } = useUserManagement();
  const params = {
    page: page,
    limit: pageLimit,
    search: searchVal ?? '',
    role: 'SUPER_ADMIN',
    createdAt: date
      ? dayjs(date[initialTab]).format(DATE_FORMAT?.API)
      : undefined,
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
