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
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import AddUsers from '../AddUsers';

const UserTable = () => {
  const {
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    open,
    theme,
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
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.SEARCH_USER]}>
          <Search
            searchBy={searchUser}
            width="260px"
            label={'Search here'}
            setSearchBy={setSearchUser}
            size="small"
          />
        </PermissionsGuard>
        <Box display="flex" gap={2}>
          {checkedUser?.length > indexNumbers?.ONE ? (
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
          ) : (
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              className="small"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              disabled={checkedUser?.length > indexNumbers?.ZERO ? false : true}
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '4px',
                color: `${theme?.palette?.custom.main}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0.7rem',
                fontWeight: 500,
                marginY: { xs: '10px', sm: '0px' },
                width: { xs: '100%', sm: 'fit-content' },
              }}
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
            <MenuItem
              onClick={() => {
                setIsOpenDelete(true);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.ADD_USER]}>
            <Button
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
      <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.USER_LIST]}>
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
      </PermissionsGuard>

      <AlertModals
        message={'Are you sure you want to delete this user?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        loading={deleteProductUsersLoading}
        handleSubmitBtn={() => deleteHandler(checkedUser)}
      />

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
