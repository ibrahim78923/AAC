import { Box, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { columnsUser } from './Users.data';
import useUsers from './useUsers';
import { AddWhiteBgIcon, DeleteIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import { DRAWER_TYPES } from '@/constants/strings';
import { indexNumbers } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import AddUsers from '../AddUsers';

const UserTable = () => {
  const {
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    open,
    handleClick,
    handleClose,
    deleteHandler,
    deleteProductUsersLoading,
    productsUsers,
    setPage,
    setPageLimit,
    searchUser,
    setSearchUser,
    isLoading,
    isSuccess,
    checkedUser,
    setCheckedUser,
    isAddUserDrawer,
    setIsAddUserDrawer,
  } = useUsers();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '1rem',
          gap: '1rem',
          width: '100%',
        }}
      >
        <PermissionsGuard
          permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.SEARCH_USERS]}
        >
          <Search
            searchBy={searchUser}
            width="260px"
            label={'Search here'}
            setSearchBy={setSearchUser}
            size="small"
          />
        </PermissionsGuard>
        <Box
          display="flex"
          flexWrap={'wrap'}
          gap={1}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          {checkedUser?.length > indexNumbers?.ONE ? (
            <PermissionsGuard
              permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.DELETE_USERS]}
            >
              <LoadingButton
                className="small"
                variant="outlined"
                color="inherit"
                startIcon={<DeleteIcon />}
                loading={deleteProductUsersLoading}
                onClick={() => deleteHandler(checkedUser)}
              >
                Delete
              </LoadingButton>
            </PermissionsGuard>
          ) : (
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              className="small"
              color="inherit"
              variant="outlined"
              aria-expanded={open ? 'true' : undefined}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
              onClick={handleClick}
              disabled={checkedUser?.length > indexNumbers?.ZERO ? false : true}
            >
              Actions <ArrowDropDownIcon />
            </Button>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <PermissionsGuard
              permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.EDIT_USERS]}
            >
              <MenuItem
                onClick={() => {
                  setIsAddUserDrawer({
                    isToggle: true,
                    type: DRAWER_TYPES?.EDIT,
                    recordId: checkedUser,
                  });
                  handleClose();
                }}
              >
                Edit
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.VIEW_USERS]}
            >
              <MenuItem
                onClick={() => {
                  setIsAddUserDrawer({
                    ...isAddUserDrawer,
                    isToggle: true,
                    type: DRAWER_TYPES?.VIEW,
                    recordId: checkedUser,
                  });
                  handleClose();
                }}
              >
                View
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.DELETE_USERS]}
            >
              <MenuItem
                onClick={() => {
                  setIsOpenDelete(true);
                  handleClose();
                }}
              >
                Delete
              </MenuItem>
            </PermissionsGuard>
          </Menu>
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.ADD_USER]}
          >
            <Button
              sx={{ width: { xs: '100%', sm: 'auto' } }}
              className="small"
              onClick={() => {
                setIsAddUserDrawer({
                  ...isAddUserDrawer,
                  isToggle: true,
                  type: DRAWER_TYPES?.ADD,
                });
              }}
              startIcon={<AddWhiteBgIcon />}
              variant="contained"
            >
              Add User
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <TanstackTable
        columns={columnsUser(
          checkedUser,
          setCheckedUser,
          productsUsers?.data?.usercompanyaccounts,
        )}
        data={productsUsers?.data?.usercompanyaccounts}
        isPagination
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={productsUsers?.data?.meta?.pages}
        pageLimit={productsUsers?.data?.meta?.limit}
        totalRecords={productsUsers?.data?.meta?.total}
        isLoading={isLoading}
        isSuccess={isSuccess}
        currentPage={productsUsers?.data?.meta?.page}
      />
      {isOpenDelete && (
        <AlertModals
          message={'Are you sure you want to delete this user?'}
          type={'delete'}
          open={isOpenDelete}
          handleClose={() => setIsOpenDelete(false)}
          loading={deleteProductUsersLoading}
          handleSubmitBtn={() => deleteHandler(checkedUser)}
        />
      )}
      {isAddUserDrawer?.isToggle && (
        <AddUsers
          isAddUserDrawer={isAddUserDrawer}
          setIsAddUserDrawer={setIsAddUserDrawer}
        />
      )}
    </>
  );
};

export default UserTable;
