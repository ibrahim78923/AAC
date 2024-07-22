import TanstackTable from '@/components/Table/TanstackTable';
import { superAdminColumns } from '../Users.data';
import useUserManagement from '../../useUserManagement';
import { DATE_FORMAT, EQuickLinksType } from '@/constants';
import dayjs from 'dayjs';
import { IUsersProps } from '@/modules/superAdmin/UserManagement/Users/Users-interface';

const Admin = (props: IUsersProps) => {
  const {
    checkedRows,
    setCheckedRows,
    date,
    searchVal,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  } = props;
  const { useGetUsersQuery, handleUserSwitchChange, initialTab } =
    useUserManagement();
  const params = {
    page: page,
    limit: pageLimit,
    search: searchVal ?? '',
    role: EQuickLinksType?.SUPER_ADMIN,
    createdAt: date
      ? dayjs(date[initialTab]).format(DATE_FORMAT?.API)
      : undefined,
  };
  const { data, isSuccess, isLoading } = useGetUsersQuery(params);

  const handleCheckboxChange = (val: any, rowId: string) => {
    const newCheckedRows = val?.target?.checked ? rowId : null;
    setCheckedRows(newCheckedRows);
  };

  const columnsProps = {
    handleUserSwitchChange: handleUserSwitchChange,
    checkedRows: checkedRows,
    handleCheckboxChange: handleCheckboxChange,
  };
  const columnParams = superAdminColumns(columnsProps);

  return (
    <>
      <TanstackTable
        columns={columnParams}
        data={data?.data?.users}
        isPagination
        onPageChange={(page: number) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        isLoading={isLoading}
        isSuccess={isSuccess}
        currentPage={data?.data?.meta?.page}
      />
    </>
  );
};

export default Admin;
