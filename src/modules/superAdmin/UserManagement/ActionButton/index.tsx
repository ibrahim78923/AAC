import { Box, Button, Menu, MenuItem } from '@mui/material';
import useUserManagement from '../useUserManagement';
import { ArrowDropDown } from '@mui/icons-material';
import AddUser from '../Users/AddUser';
import {
  SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS,
  SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS,
} from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const ActionButton = (props?: any) => {
  const { checkedRows, tabVal, setIsOpenAddUserDrawer } = props;
  const {
    selectedValue,
    handleClick,
    handleClose,
    handleUsersList,
    isOpenAddUserDrawer,
    useGetUsersByIdQuery,
  } = useUserManagement();

  const { data } = useGetUsersByIdQuery(checkedRows);

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        disabled={checkedRows === null ? true : false}
        sx={{ width: { sm: '112px', xs: '100%' } }}
      >
        Actions
        <ArrowDropDown />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
        sx={{
          '.MuiPopover-paper': {
            minWidth: '115px',
          },
        }}
      >
        {tabVal === 0 && (
          <MenuItem onClick={() => handleUsersList(data?.data)}>
            User List
          </MenuItem>
        )}
        <PermissionsGuard
          permissions={
            tabVal === 2
              ? [SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS?.VIEW_ROLE]
              : []
          }
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setIsOpenAddUserDrawer({
                ...isOpenAddUserDrawer,
                drawer: true,
                type: 'view',
                data: data,
              });
            }}
          >
            View
          </MenuItem>
        </PermissionsGuard>

        <PermissionsGuard
          permissions={
            tabVal === 0
              ? [SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.EDIT_USER]
              : [SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS?.EDIT_ROLE]
          }
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setIsOpenAddUserDrawer({
                ...isOpenAddUserDrawer,
                drawer: true,
                type: 'edit',
                data: data,
              });
            }}
          >
            Edit
          </MenuItem>
        </PermissionsGuard>
      </Menu>
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
        />
      )}
    </Box>
  );
};

export default ActionButton;
