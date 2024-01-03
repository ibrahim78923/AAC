import React from 'react';
import { usersTableColumns } from './UsersTable.data';
import TanstackTable from '@/components/Table/TanstackTable';
import useUsers from '../useUsers';

const UsersTable = ({ setUsersData, usersData }: any) => {
  const { getSoftwareUsers, setPage, setLimit } = useUsers();
  return (
    <div>
      <TanstackTable
        columns={usersTableColumns(
          usersData,
          setUsersData,
          getSoftwareUsers?.data?.data?.softwareUsers || [],
        )}
        data={getSoftwareUsers?.data?.data?.softwareUsers || []}
        isLoading={getSoftwareUsers?.isLoading}
        isError={getSoftwareUsers?.isError}
        isFetching={getSoftwareUsers?.isFetching}
        isSuccess={getSoftwareUsers?.isSuccess}
        currentPage={getSoftwareUsers?.data?.data?.meta?.page}
        count={getSoftwareUsers?.data?.data?.meta?.pages}
        pageLimit={getSoftwareUsers?.data?.data?.meta?.limit}
        totalRecords={getSoftwareUsers?.data?.data?.meta?.total}
        isPagination
        setPage={setPage}
        setPageLimit={setLimit}
        onPageChange={(page: any) => setPage(page)}
      />
    </div>
  );
};

export default UsersTable;
