import { Box, Button, Menu, MenuItem } from '@mui/material';
import useUserManagement from '../useUserManagement';
import { ArrowDropDown } from '@mui/icons-material';
import AddUser from '../Users/AddUser';
import {
  SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS,
  SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS,
} from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ActionButtonProps } from '@/modules/superAdmin/UserManagement/useManagement-interface';
import { useRouter } from 'next/router';
import { SUPER_ADMIN } from '@/constants';
import { DRAWER_TYPES } from '@/constants/strings';

const ActionButton = (props: ActionButtonProps) => {
  const { checkedRows, tabVal, setIsOpenAddUserDrawer } = props;
  const {
    selectedValue,
    handleClick,
    handleClose,
    handleUsersList,
    isOpenAddUserDrawer,
  } = useUserManagement();
  const navigate = useRouter();
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
          <MenuItem onClick={() => handleUsersList(checkedRows)}>
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
              tabVal === 2
                ? navigate?.push({
                    pathname: SUPER_ADMIN?.ADDROLE,
                    query: { type: DRAWER_TYPES?.VIEW, id: checkedRows },
                  })
                : setIsOpenAddUserDrawer({
                    drawer: true,
                    type: DRAWER_TYPES?.VIEW,
                    recordId: checkedRows,
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
              tabVal === 2
                ? navigate?.push({
                    pathname: SUPER_ADMIN?.ADDROLE,
                    query: { type: DRAWER_TYPES?.EDIT, id: checkedRows },
                  })
                : setIsOpenAddUserDrawer({
                    drawer: true,
                    type: DRAWER_TYPES?.EDIT,
                    recordId: checkedRows,
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
