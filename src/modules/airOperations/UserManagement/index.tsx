import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, Typography } from '@mui/material';
import { User } from './User';
import { Teams } from './Teams';

export const UserManagement = () => {
  return (
    <Box>
      <Typography>User Management</Typography>
      <br />
      <HorizontalTabs tabsDataArray={['User', 'Teams']}>
        <User />
        <Teams />
      </HorizontalTabs>
    </Box>
  );
};
