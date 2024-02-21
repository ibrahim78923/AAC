import TanstackTable from '@/components/Table/TanstackTable';

import { UserHeader } from './UserHeader';
import { Box } from '@mui/material';
import { useUser } from './useUser';
import UpsertUser from './UpsertUser';

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
        <TanstackTable
          data={userData}
          columns={userListColumn}
          isPagination={true}
        />
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
