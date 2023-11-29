import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { superAdminColumns } from '../Users.data';
import useUserManagement from '../../useUserManagement';

const Admin = (props: any) => {
  const { checkedRows, setCheckedRows, filterValues, searchVal } = props;
  const { useGetUsersQuery, handleUserSwitchChange } = useUserManagement();
  const params = {
    page: 1,
    limit: 100,
    role: 'SUPER_ADMIN',
    search: searchVal ?? '',
    products: filterValues?.products ?? '',
    // organization: filterValues?.organization ?? ''
  };
  const { data } = useGetUsersQuery(params);
  const columnsProps = {
    handleUserSwitchChange: handleUserSwitchChange,
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };
  const columnParams = superAdminColumns(columnsProps);

  return (
    <>
      <TanstackTable columns={columnParams} data={data?.data?.users} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Admin;
