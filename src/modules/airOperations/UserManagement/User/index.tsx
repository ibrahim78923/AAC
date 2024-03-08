import TanstackTable from '@/components/Table/TanstackTable';
import { UserHeader } from './UserHeader';
import { Box } from '@mui/material';
import { useUser } from './useUser';
import UpsertUser from './UpsertUser';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const User = () => {
  const {
    selectedUserList,
    userListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    userData,
    setSearch,
  } = useUser();
  return (
    <Box>
      <UserHeader selectedUserList={selectedUserList} setSearch={setSearch} />
      <Box mt={'0.75rem'}>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.USER_LIST,
          ]}
        >
          <TanstackTable
            data={userData}
            columns={userListColumn}
            isPagination={true}
          />
        </PermissionsGuard>
        <UpsertUser
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          title={'User View'}
          okText={'Save'}
        />
      </Box>
    </Box>
  );
};
