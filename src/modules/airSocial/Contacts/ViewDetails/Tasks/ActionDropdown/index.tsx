import { Button, Menu, MenuItem, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
const ActionDropdown = (props: any) => {
  const {
    anchorEl,
    isActionMenuOpen,
    handleOpenActionMenu,
    handleCloseActionMenu,
    handleOpenDrawer,
    isActionsDisabled,
    isMenuItemDisabled,
    handleOpenModalReassign,
    handleOpenModalDelete,
  } = props;
  const theme = useTheme();

  return (
    <div>
      <Button
        endIcon={<ArrowDropDown />}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: `${theme?.palette?.custom?.main}`,
          minWidth: '0px',
          height: '35px',
        }}
        onClick={handleOpenActionMenu}
        disabled={isActionsDisabled}
      >
        Action
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isActionMenuOpen}
        onClose={handleCloseActionMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled={!isMenuItemDisabled} onClick={handleOpenDrawer}>
          View
        </MenuItem>
        <MenuItem
          disabled={!isMenuItemDisabled}
          onClick={handleOpenModalReassign}
        >
          Re-assign
        </MenuItem>
        <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};
export default ActionDropdown;
