import { Box, Button, Tooltip, Typography } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import Users from './Users';

import UsersManagementFilters from './UsersManagmentFilters/index';

import RolesAndRights from './RolesAndRights';

import AddUser from './Users/AddUser';

import SuperAdminUsers from './Users/Admin';

import { FilterrIcon, PlusIcon, RefreshTasksIcon } from '@/assets/icons';

import useUserManagement from './useUserManagement';
import ActionButton from './ActionButton';

import { SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';

const UserManagement = () => {
  const {
    theme,
    isOpenAddUserDrawer,
    setIsOpenAddUserDrawer,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    tabVal,
    setTabVal,
    filterValues,
    setFilterValues,
    handleAddRole,
    checkedRows,
    setCheckedRows,
    searchVal,
    setSearchVal,
    resetFilters,
    initialTab,
    tabTwo,
    tabOne,
    datePickerVal,
    setDatePickerVal,
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
        <Typography variant="h3">User Management</Typography>
        <PermissionsGuard
          permissions={[SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS.ADD_USER]}
        >
          <Button
            sx={{ mt: { md: 0, xs: 1 } }}
            className="small"
            onClick={() =>
              tabVal === tabTwo
                ? handleAddRole()
                : setIsOpenAddUserDrawer({
                    drawer: true,
                    type: 'add',
                    data: {},
                  })
            }
            variant="contained"
            startIcon={<PlusIcon />}
          >
            {tabVal === initialTab
              ? 'Add Company Owner'
              : tabVal === tabOne
              ? 'Add Super Admin '
              : 'Add Role'}
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
              label: 'Search by Name',
              setSearchBy: setSearchVal,
              searchBy: searchVal,
            }}
            isHeader={true}
            tabsArray={[
              'Company Owners',
              'Super Admin Users',
              'Role and Rights',
            ]}
            headerChildren={
              <>
                <ActionButton
                  checkedRows={checkedRows}
                  tabVal={tabVal}
                  setIsOpenAddUserDrawer={setIsOpenAddUserDrawer}
                />
                <Tooltip title={'Refresh Filter'}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    className="small"
                    onClick={resetFilters}
                  >
                    <RefreshTasksIcon />
                  </Button>
                </Tooltip>
                {tabVal !== tabOne ? (
                  <Button
                    onClick={() => {
                      setIsOpenFilterDrawer(true);
                    }}
                    startIcon={<FilterrIcon />}
                    sx={{
                      border: `1px solid ${theme?.palette?.custom?.dark}`,
                      color: theme?.palette?.custom?.main,
                      width: '95px',
                      height: '36px',
                    }}
                  >
                    Filter
                  </Button>
                ) : (
                  <SwitchableDatepicker
                    renderInput="button"
                    placement="right"
                    dateValue={datePickerVal}
                    setDateValue={setDatePickerVal}
                  />
                )}
              </>
            }
          >
            <Users
              checkedRows={checkedRows}
              setCheckedRows={setCheckedRows}
              filterValues={filterValues}
              searchVal={searchVal}
            />
            <SuperAdminUsers
              checkedRows={checkedRows}
              setCheckedRows={setCheckedRows}
              filterValues={filterValues}
              searchVal={searchVal}
            />
            <RolesAndRights />
          </CommonTabs>
        </Box>
      </PermissionsGuard>

      {isOpenFilterDrawer && (
        <UsersManagementFilters
          tabVal={tabVal}
          isOpen={isOpenFilterDrawer}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          setIsOpen={setIsOpenFilterDrawer}
        />
      )}

      {isOpenAddUserDrawer?.drawer && (
        <AddUser
          tabVal={tabVal}
          isOpenDrawer={isOpenAddUserDrawer?.drawer}
          onClose={() =>
            setIsOpenAddUserDrawer({
              ...isOpenAddUserDrawer,
              drawer: false,
            })
          }
          isOpenAddUserDrawer={isOpenAddUserDrawer}
          setIsOpenAddUserDrawer={setIsOpenAddUserDrawer}
        />
      )}
    </Box>
  );
};

export default UserManagement;
