import TanstackTable from '@/components/Table/TanstackTable';
import { userListData } from './User.data';
import { UserHeader } from './UserHeader';
import { Box } from '@mui/material';
import { useUser } from './useUser';

export const User = () => {
  const { selectedUserList, userListColumn } = useUser();
  return (
    <Box>
      <UserHeader selectedUserList={selectedUserList} />
      <Box mt={'0.75rem'}>
        <TanstackTable
          data={userListData}
          columns={userListColumn}
          isPagination={true}
        />
      </Box>
    </Box>
  );
};
