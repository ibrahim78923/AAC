import { Box, Button, Typography, Theme, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserTable from './Users';
import TeamsTable from './Teams';
import useUserManagement from './useUserManagement';
import CommonTabs from '@/components/Tabs';
import CreateTeams from './Teams/CreateTeams';

const Users = () => {
  const theme = useTheme<Theme>();
  const { activeTab, setActiveTab, isCreateTeamOpen, setIsCreateTeamOpen } =
    useUserManagement();

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
          <Button
            className="small"
            // onClick={() => {
            //   {
            //     activeTab === 0
            //       ? setIsAddUserOpen(true)
            //       : setIsCreateTeamOpen(true);
            //   }
            // }}
            variant="contained"
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              marginTop: { xs: '10px', sm: '0px' },
              width: { xs: '100%', sm: 'fit-content' },
            }}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />
            {activeTab === 0 ? 'Add User' : 'Create Team'}
          </Button>
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

      <CreateTeams
        isCreateTeamOpen={isCreateTeamOpen}
        setIsCreateTeamOpen={setIsCreateTeamOpen}
      />
    </>
  );
};

export default Users;
