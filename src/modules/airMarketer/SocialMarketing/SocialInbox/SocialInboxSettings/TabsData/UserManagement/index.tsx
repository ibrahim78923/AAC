import { Box, Typography, Theme, useTheme } from '@mui/material';
import UserTable from './Users';
import TeamsTable from './Teams';
import useUserManagement from './useUserManagement';
import CommonTabs from '@/components/Tabs';

const Users = () => {
  const theme = useTheme<Theme>();
  const { setActiveTab } = useUserManagement();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          boxShadow: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">User Management</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <CommonTabs
            getTabVal={(val: any) => setActiveTab(val)}
            tabsArray={['Users', 'Teams']}
          >
            <UserTable />
            <TeamsTable />
          </CommonTabs>
        </Box>
      </Box>
    </>
  );
};

export default Users;
