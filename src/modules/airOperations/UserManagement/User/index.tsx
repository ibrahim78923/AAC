import TanstackTable from '@/components/Table/TanstackTable';
import { userListData } from './User.data';
import { UserHeader } from './UserHeader';
import { Box } from '@mui/material';
import { useUser } from './useUser';
import UpsertUser from './UpsertUser';

export const User = () => {
  const { selectedUserList, userListColumn, isDrawerOpen, setIsDrawerOpen } =
    useUser();
  return (
    <Box>
      <UserHeader selectedUserList={selectedUserList} />
      <Box mt={'0.75rem'}>
        <TanstackTable
          data={userListData}
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
