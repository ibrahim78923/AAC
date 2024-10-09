import { usersTableColumns } from './UsersTable.data';
import TanstackTable from '@/components/Table/TanstackTable';
import useUsers from '../useUsers';
import { UserTableI } from './UsersTable.interface';

const UsersTable = ({ setUsersData, usersData }: UserTableI) => {
  const {
    getSoftwareUsers,
    page,
    limit,
    setPage,
    setLimit,
    isFetching,
    isLoading,
    metaData,
    isError,
    isSuccess,
    handleGetUser,
  } = useUsers();
  const userDetails = getSoftwareUsers?.data?.softwareusers;
  return (
    <div>
      <TanstackTable
        columns={usersTableColumns(usersData, setUsersData, userDetails)}
        data={userDetails}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isSuccess={isSuccess}
        currentPage={page}
        count={metaData?.pages}
        pageLimit={limit}
        totalRecords={metaData?.total}
        isPagination
        setPage={setPage}
        setPageLimit={setLimit}
        onPageChange={(page: number) => setPage(page)}
        errorProps={{ canRefresh: true, refresh: handleGetUser }}
      />
    </div>
  );
};

export default UsersTable;
