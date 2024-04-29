import { Box, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { columnsUser } from './Users.data';
import useUserManagement from '../useUserManagement';
import useUsers from './useUsers';
import { DeleteIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

const UserTable = (props: any) => {
  const { setIsAddUserDrawer, isAddUserDrawer, checkedUser, setCheckedUser } =
    props;
  const {
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    open,
    theme,
    handleClick,
    handleClose,
    updateUserLoading,
    deleteHandler,
    deleteProductUsersLoading,
  } = useUsers();

  const {
    productsUsers,
    searchUser,
    setSearchUser,
    setPage,
    setPageLimit,
    isLoading,
    isSuccess,
  } = useUserManagement();

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
        <PermissionsGuard
          permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.SEARCH_USERS]}
        >
          <Search
            searchBy={searchUser}
            width="260px"
            label={'Search here'}
            setSearchBy={setSearchUser}
          />
        </PermissionsGuard>
        {checkedUser?.length > 1 ? (
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
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            disabled={checkedUser?.length > 0 ? false : true}
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
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.EDIT_USERS]}
          >
            <MenuItem
              onClick={() => {
                setIsAddUserDrawer({
                  isToggle: true,
                  type: 'edit',
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
                  type: 'view',
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
      </Box>
      <TanstackTable
        columns={columnsUser(
          checkedUser,
          setCheckedUser,
          updateUserLoading,
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
      />
      <AlertModals
        message={'Are you sure you want to delete this user?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        loading={deleteProductUsersLoading}
        handleSubmitBtn={() => deleteHandler(checkedUser)}
      />
    </>
  );
};

export default UserTable;
