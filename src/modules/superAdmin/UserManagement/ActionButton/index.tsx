import { Box, Button, Menu, MenuItem } from '@mui/material';
import useUserManagement from '../useUserManagement';
import { ArrowDropDown } from '@mui/icons-material';

const ActionButton = () => {
  const { theme, selectedValue, handleClick, handleClose, handleUsersList } =
    useUserManagement();

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: theme?.palette?.custom?.main,
          width: '112px',
          height: '36px',
        }}
      >
        Actions
        <ArrowDropDown />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleUsersList}>User List</MenuItem>
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionButton;
