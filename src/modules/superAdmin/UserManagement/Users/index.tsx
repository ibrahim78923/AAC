import React from 'react';

import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Tabel/TanstackTable';

import { columns, data } from './Users.data';

const Users = () => {
  return (
    <>
      <TanstackTable columns={columns} data={data} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Users;
