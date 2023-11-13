import { Box, Button, Typography } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import Users from './Users';

import UsersManagementFilters from './UsersManagmentFilters/index';

import RolesAndRights from './RolesAndRights';

import AddUser from './Users/AddUser';

import SuperAdminUsers from './Users/Admin';

import { FilterSharedIcon, PlusIcon } from '@/assets/icons';

import useUserManagement from './useUserManagement';
import ActionButton from './ActionButton';

import { SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const UserManagement = () => {
  const {
    theme,
    isOpenAddUserDrawer,
    setIsOpenAddUserDrawer,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    tabVal,
    setTabVal,
    search,
    setSearch,
    handleAddRole,
  } = useUserManagement();

  return (
    <Box
      sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
    >
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' } }}
      >
        <Typography variant="h4">User Management</Typography>
        <PermissionsGuard
          permissions={[SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS.ADD_USER]}
        >
          <Button
            onClick={() =>
              tabVal === 2 ? handleAddRole() : setIsOpenAddUserDrawer(true)
            }
            variant="contained"
            startIcon={<PlusIcon />}
          >
            {tabVal === 2 ? 'Add Role' : 'Add User'}
          </Button>
        </PermissionsGuard>
      </Box>
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.USER_SEARCH_AND_FILTER,
        ]}
      >
        <Box sx={{ padding: '0px 24px' }}>
          <CommonTabs
            getTabVal={(val: number) => setTabVal(val)}
            searchBarProps={{
              label: 'Search Here',
              setSearchBy: setSearch,
              searchBy: search,
              width: '260px',
            }}
            isHeader={true}
            tabsArray={[
              'Company Owners',
              'Super Admin Users',
              'Role and Rights',
            ]}
            headerChildren={
              <>
                <ActionButton />
                <Button
                  onClick={() => {
                    setIsOpenFilterDrawer(true);
                  }}
                  startIcon={<FilterSharedIcon />}
                  sx={{
                    border: `1px solid ${theme?.palette?.custom?.dark}`,
                    color: theme?.palette?.custom?.main,
                    width: '95px',
                    height: '36px',
                  }}
                >
                  Filter
                </Button>
              </>
            }
          >
            <Users />
            <SuperAdminUsers />
            <RolesAndRights />
          </CommonTabs>
        </Box>
      </PermissionsGuard>

      {isOpenFilterDrawer && (
        <UsersManagementFilters
          tabVal={tabVal}
          isOpen={isOpenFilterDrawer}
          setIsOpen={setIsOpenFilterDrawer}
        />
      )}

      {isOpenAddUserDrawer && (
        <AddUser
          isOpenDrawer={isOpenAddUserDrawer}
          onClose={() => setIsOpenAddUserDrawer(false)}
        />
      )}
    </Box>
  );
};

export default UserManagement;
