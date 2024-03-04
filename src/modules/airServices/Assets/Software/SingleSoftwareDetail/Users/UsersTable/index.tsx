import React from 'react';
import { usersTableColumns } from './UsersTable.data';
import TanstackTable from '@/components/Table/TanstackTable';
import useUsers from '../useUsers';
// import { userAgent } from 'next/server';

const UsersTable = ({ setUsersData, usersData }: any) => {
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
  } = useUsers();
  const userDetails = getSoftwareUsers?.data;
  // console.log(getSoftwareUsers?.data);

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
        onPageChange={(page: any) => setPage(page)}
      />
    </div>
  );
};

export default UsersTable;
