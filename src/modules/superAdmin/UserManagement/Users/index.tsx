import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './Users.data';
import useUserManagement from '../useUserManagement';

const Users = () => {
  const { useGetUsersQuery, search, handleUserSwitchChange } =
    useUserManagement();
  const params = {
    role: 'ORG_ADMIN',
    search: search,
  };
  const { data } = useGetUsersQuery(params);
  const columnParams = columns(handleUserSwitchChange);

  return (
    <>
      <TanstackTable columns={columnParams} data={data?.data?.users} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Users;
