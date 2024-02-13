import { Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useTheme } from '@mui/material';

const NotesActionDropdown = (props: any) => {
  const theme = useTheme();
  const {
    anchorEl,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    selectedCheckboxes,
    openViewDrawer,
    openEditDrawer,
    openDeleteAlert,
  } = props;

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
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleOpenMenu}
        disabled={selectedCheckboxes?.length === 0}
      >
        Action
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          disabled={selectedCheckboxes?.length > 1}
          onClick={() => openViewDrawer(selectedCheckboxes[0])}
        >
          View
        </MenuItem>
        <MenuItem
          disabled={selectedCheckboxes?.length > 1}
          onClick={() => openEditDrawer(selectedCheckboxes[0])}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={openDeleteAlert}>Delete</MenuItem>
      </Menu>
    </div>
  );
};
export default NotesActionDropdown;
