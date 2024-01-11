import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useBankAccounts from '../useBankAccounts';

const ActionDropDown = () => {
  const { selectedValue, handleClick, handleClose } = useBankAccounts();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
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
        <MenuItem onClick={() => handleClose()}>Edit</MenuItem>
        <MenuItem onClick={() => handleClose()}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionDropDown;
