import { Popover, Button, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ContactsActions = ({
  anchorEl,
  actionMenuOpen,
  handleActionsMenuClick,
  handleActionsMenuClose,
  disableActionBtn,
}: any) => {
  return (
    <div>
      <Button
        variant="outlined"
        className="small"
        color="inherit"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleActionsMenuClick}
        disabled={disableActionBtn}
        classes={{ outlined: 'outlined_btn' }}
      >
        Actions
      </Button>
      <Popover
        open={actionMenuOpen}
        anchorEl={anchorEl}
        onClose={handleActionsMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem>Restore</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Popover>
    </div>
  );
};

export default ContactsActions;
