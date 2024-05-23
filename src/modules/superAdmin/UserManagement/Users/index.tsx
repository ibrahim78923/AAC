import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Users.data';
import useUserManagement from '../useUserManagement';
import dayjs from 'dayjs';
import { DATE_FORMAT, EQuickLinksType } from '@/constants';

const Users = (props: any) => {
  const {
    checkedRows,
    setCheckedRows,
    filterValues,
    searchVal,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  } = props;
  const { useGetUsersQuery, handleUserSwitchChange } = useUserManagement();

  const params = {
    page: page,
    limit: pageLimit,
    role: EQuickLinksType?.ORG_ADMIN,
    search: searchVal ?? '',
    products: filterValues?.products?._id ?? '',
    organization: filterValues?.organization?._id ?? '',
    createdAt: filterValues?.createdDate
      ? dayjs(filterValues?.createdDate).format(DATE_FORMAT?.API)
      : undefined,
  };
  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetUsersQuery(params);

  const handleCheckboxChange = (val: any, rowId: string) => {
    const recordId = val?.target?.checked ? rowId : null;
    setCheckedRows(recordId);
  };

  const columnsProps = {
    handleUserSwitchChange: handleUserSwitchChange,
    checkedRows: checkedRows,
    handleCheckboxChange: handleCheckboxChange,
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
        isFetching={isFetching}
        isError={isError}
        currentPage={data?.data?.meta?.page}
      />
    </>
  );
};

export default Users;
