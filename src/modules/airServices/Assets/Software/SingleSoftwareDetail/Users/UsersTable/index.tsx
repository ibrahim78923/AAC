import React from 'react';
import { usersTableData, usersTableColumns } from './UsersTable.utils';
import TanstackTable from '@/components/Tabel/TanstackTable';

const UsersTable = ({ setusersData, usersData }: any) => {
  return (
    <div>
      <TanstackTable
        columns={usersTableColumns(usersData, setusersData, usersTableData)}
        data={usersTableData}
      />
    </div>
  );
};

export default UsersTable;
