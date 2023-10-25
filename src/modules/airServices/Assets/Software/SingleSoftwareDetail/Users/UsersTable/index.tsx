import React from 'react';
import { usersTableData, usersTableColumns } from './UsersTable.data';
import TanstackTable from '@/components/Tabel/TanstackTable';

const UsersTable = ({ setUsersData, usersData }: any) => {
  return (
    <div>
      <TanstackTable
        columns={usersTableColumns(usersData, setUsersData, usersTableData)}
        data={usersTableData}
      />
    </div>
  );
};

export default UsersTable;
