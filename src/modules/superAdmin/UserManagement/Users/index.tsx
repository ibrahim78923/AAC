import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Tabel/TanstackTable';

import { columns } from './Users.data';
import useUserManagement from '../useUserManagement';

const Users = () => {
  const { useGetUsersQuery } = useUserManagement();
  const { data } = useGetUsersQuery();

  return (
    <>
      <TanstackTable columns={columns} data={data?.data?.useros} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Users;
