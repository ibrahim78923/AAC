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
    initialTab,
  } = useUserManagement();
  const params = {
    page: checkedRows?.page,
    limit: pageLimit,
    search: searchVal ?? '',
    role: 'SUPER_ADMIN',
    createdAt: date
      ? dayjs(date[initialTab]).format(DATE_FORMAT?.API)
      : undefined,
  };
  const { data, isSuccess, isLoading } = useGetUsersQuery(params);

  const handleCheckboxChange = (val: any, rowId: string) => {
    const newCheckedRows = val?.target?.checked ? rowId : null;
    setCheckedRows({ ...checkedRows, selectedValue: newCheckedRows });
  };

  const columnsProps = {
    handleUserSwitchChange: handleUserSwitchChange,
    checkedRows: checkedRows?.selectedValue,
    handleCheckboxChange: handleCheckboxChange,
  };
  const columnParams = superAdminColumns(columnsProps);

  return (
    <>
      <TanstackTable
        columns={columnParams}
        data={data?.data?.users}
        onPageChange={(page: any) =>
          setCheckedRows({ ...checkedRows, page: page })
        }
        setPage={setCheckedRows}
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
