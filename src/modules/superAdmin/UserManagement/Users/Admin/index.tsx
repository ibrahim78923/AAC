import React from 'react';

import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Tabel/TanstackTable';

import { superAdminColumns } from '../Users.data';
import useUserManagement from '../../useUserManagement';

const Admin = () => {
  const { useGetUsersQuery } = useUserManagement();
  const { data } = useGetUsersQuery({ role: 'SUPER_ADMIN' });

  return (
    <>
      <TanstackTable columns={superAdminColumns} data={data?.data?.users} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Admin;
