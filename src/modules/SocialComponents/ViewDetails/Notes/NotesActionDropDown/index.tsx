import { Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { AlertModals } from '@/components/AlertModals';

import useNotesActionDropdown from './useNotesActionDropDown';

const NotesActionDropdown = (props: any) => {
  const { setOpenDrawer, selectedCheckboxes, setSelectedCheckboxes } = props;
  const {
    theme,
    isMenuOpen,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    isOpenAlertModal,
    handleOpenEditDrawer,
    handleOpenViewDrawer,
    handleOpenDeleteAlert,
    handleCloseAlert,
    handleDeleteHandler,
  } = useNotesActionDropdown({
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
  });

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
        disabled={
          selectedCheckboxes?.length === 0 || selectedCheckboxes?.length > 1
        }
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
        <MenuItem onClick={handleOpenViewDrawer}>View</MenuItem>
        <MenuItem onClick={handleOpenEditDrawer}>Edit</MenuItem>
        <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
      </Menu>

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={isOpenAlertModal}
        handleClose={handleCloseAlert}
        handleSubmitBtn={handleDeleteHandler}
      />
    </div>
  );
};
export default NotesActionDropdown;
