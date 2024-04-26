import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useRoleAndRight from '../useRoleAndRight';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';

const ActionButton = (props?: any) => {
  const { checkedRows, setIsDraweropen } = props;
  const { selectedValue, handleClick, handleClose } = useRoleAndRight();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        disabled={checkedRows === undefined ? true : false}
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
        <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.EDIT_ROLE]}>
          <MenuItem
            onClick={() => {
              handleClose();
              setIsDraweropen({
                isToggle: true,
                type: 'edit',
                id: checkedRows,
              });
            }}
          >
            Edit
          </MenuItem>
        </PermissionsGuard>
        <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.DELETE_ROLE]}>
          <MenuItem
            onClick={() => {
              handleClose();
              setIsDraweropen({
                isToggle: true,
                type: 'view',
                id: checkedRows,
              });
            }}
          >
            View
          </MenuItem>
        </PermissionsGuard>
      </Menu>
    </Box>
  );
};

export default ActionButton;
