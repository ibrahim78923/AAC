import React from 'react';

import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Tabel/TanstackTable';

import { columns, data } from './UsersList.data';

const UsersList = () => {
  return (
    <>
      <TanstackTable columns={columns} data={data} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default UsersList;
