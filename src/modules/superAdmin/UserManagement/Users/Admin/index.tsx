import React from 'react';

import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Tabel/TanstackTable';

import { superAdminColumns, superAdminUsersData } from '../Users.data';

const Admin = () => {
  return (
    <>
      <TanstackTable columns={superAdminColumns} data={superAdminUsersData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Admin;
