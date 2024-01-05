import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Users.data';
import useUserManagement from '../useUserManagement';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const Users = (props: any) => {
  const { checkedRows, setCheckedRows, filterValues, searchVal } = props;
  const { useGetUsersQuery, handleUserSwitchChange, pageLimit, setPageLimit } =
    useUserManagement();

  const params = {
    page: checkedRows?.page,
    limit: pageLimit,
    role: 'ORG_ADMIN',
    search: searchVal ?? '',
    products: filterValues?.products ?? '',
    // organization: filterValues?.organization ?? '',
    createdAt: filterValues?.createdDate
      ? dayjs(filterValues?.createdDate).format(DATE_FORMAT?.API)
      : undefined,
  };
  const { data, isLoading, isSuccess } = useGetUsersQuery(params);

  const handleCheckboxChange = (val: any, rowId: string) => {
    const recordId = val?.target?.checked ? rowId : null;
    setCheckedRows({ ...checkedRows, selectedValue: recordId });
  };

  const columnsProps = {
    handleUserSwitchChange: handleUserSwitchChange,
    checkedRows: checkedRows?.selectedValue,
    handleCheckboxChange: handleCheckboxChange,
  };
  const columnParams = columns(columnsProps);

  return (
    <>
      <TanstackTable
        columns={columnParams}
        data={data?.data?.users}
        isPagination
        onPageChange={(page: any) => {
          setPageLimit(data?.data?.meta?.limit);
          setCheckedRows({ ...checkedRows, page: page });
        }}
        setPage={setCheckedRows?.page}
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
